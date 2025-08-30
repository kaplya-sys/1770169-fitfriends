import crypto from 'node:crypto';

import {ConfigType} from '@nestjs/config';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {JwtConfig} from '@1770169-fitfriends/config';
import {
  AuthUserDTO,
  CreateCoachQuestionnaireDTO,
  CreateUserDTO,
  CreateUserQuestionnaireDTO,
  UpdateUserDTO
} from '@1770169-fitfriends/dto';
import {Role} from '@1770169-fitfriends/models';
import {createJWTPayload, createMessage, isKeyOfEntity} from '@1770169-fitfriends/helpers';
import {FieldName, FileRecord, RequestFiles, Token, User} from '@1770169-fitfriends/types';
import {UsersQuery} from '@1770169-fitfriends/query';

import {UserEntity} from '../user/user.entity';
import {UserRepository} from '../user/user.repository';
import {
  NOT_FOUND_BY_EMAIL_MESSAGE,
  NOT_FOUND_BY_ID_MESSAGE,
  UPDATE_USER_ERROR_MESSAGE,
  TOKEN_CREATION_ERROR,
  TOKEN_GENERATE_ERROR,
  USER_EXISTS_MESSAGE,
  WRONG_PASSWORD_MESSAGE,
  UPDATE_USER_BALANCE_ERROR_MESSAGE,
  DEFAULT_AMOUNT,
  NOT_FOUND_BALANCE_BY_ID_MESSAGE,
  QUESTIONNAIRE_EXISTS_MESSAGE,
  NOT_FOUND_QUESTIONNAIRE_MESSAGE
} from './auth.constant';
import {BalanceEntity} from '../balance/balance.entity';
import {BalanceRepository} from '../balance/balance.repository';
import {RefreshTokenService} from '../refresh-token/refresh-token.service';
import {FilesEntity} from '../files/files.entity';
import {FilesService} from '../files/files.service';
import {QuestionnaireRepository} from '../questionnaire/questionnaire.repository';
import {QuestionnaireEntity} from '../questionnaire/questionnaire.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly questionnaireRepository: QuestionnaireRepository,
    private readonly balanceRepository: BalanceRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly filesService: FilesService,
    @Inject(JwtConfig.KEY)private readonly jwtOptions: ConfigType<typeof JwtConfig>
  ) {}

  public async registerUser(dto: CreateUserDTO, files?: RequestFiles): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if (existUser) {
      throw new NotFoundException(createMessage(USER_EXISTS_MESSAGE, [dto.email]));
    }

    let backgrounds = await this.filesService.getByFieldName(FieldName.Background);

    if (!backgrounds.length) {
      backgrounds = await this.filesService.createBackgrounds();
    }
    const backgroundIds = backgrounds
      .filter((background): background is FilesEntity => background !== null && background.subDirectory.includes(dto.role))
      .map((background) => background.id as string);
    const userEntity = await new UserEntity({...dto, backgroundIds}).setPassword(dto.password);

    if (files && files.avatar?.length) {
      const newFiles = await this.filesService.saveFiles(files);
      backgroundIds.concat(newFiles[0].id as string);
      userEntity.avatarId = newFiles[0].id;
    }

    return this.userRepository.save(userEntity);
  }

  public async addQuestionnaire(id: string, dto: CreateUserQuestionnaireDTO | CreateCoachQuestionnaireDTO, files?: RequestFiles): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    if (existUser.questionnaire) {
      throw new ConflictException(createMessage(QUESTIONNAIRE_EXISTS_MESSAGE, [id]));
    }
    const questionnaireEntity = new QuestionnaireEntity({...dto, userId: id});

    if (files && files.qualification?.length) {
      const newFiles = await this.filesService.saveFiles(files);
      questionnaireEntity.qualificationIds = newFiles.map((newFile) => newFile.id as string);
      questionnaireEntity.qualifications = newFiles;
    }
    const newQuestionnaire = await this.questionnaireRepository.save(questionnaireEntity);
    existUser.questionnaire = newQuestionnaire.toObject();
    const {backgrounds, avatar} = await this.getFiles(existUser.role, existUser.avatarId);

    if (backgrounds) {
        existUser.backgrounds = backgrounds;
      }

    if (avatar) {
      existUser.avatar = avatar;
    }

    return existUser;
  }

  public async updateUser(id: string, dto: UpdateUserDTO, files?: RequestFiles): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }
    const existQuestionnaire = await this.questionnaireRepository.findById(existUser.questionnaire?.id);

    if (!existQuestionnaire) {
      throw new NotFoundException(createMessage(NOT_FOUND_QUESTIONNAIRE_MESSAGE, [id]));
    }
    let hasUpdates = false;
    let hasQuestionnaireUpdates = false;

    if (files?.avatar) {
      if (existUser.avatarId) {
        const newFiles = await this.filesService.updateFile(existUser.avatarId, files);
        existUser.avatarId = newFiles[0].id;
      } else {
        const newFiles = await this.filesService.saveFiles(files);
        existUser.avatarId = newFiles[0].id;
      }
      hasUpdates = true;
    }

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined) {
        if (isKeyOfEntity(key, UserEntity) && existUser[key] !== value) {
          existUser[key] = value as never;
          hasUpdates = true;
        }

        if (isKeyOfEntity(key, QuestionnaireEntity) && existQuestionnaire[key] !== value) {
          existQuestionnaire[key] = value as never;
          hasQuestionnaireUpdates = true;
        }
      }
    }

    if (hasQuestionnaireUpdates) {
      await this.questionnaireRepository.update(existQuestionnaire?.id, existQuestionnaire);
    }
    const {backgrounds, avatar, qualifications} = await this.getFiles(existUser.role, existUser.avatarId, existUser.questionnaire?.qualificationIds);

    if (!hasUpdates) {
      if (backgrounds) {
        existUser.backgrounds = backgrounds;
      }

      if (avatar) {
        existUser.avatar = avatar;
      }

      if (existUser.role === Role.coach && existUser.questionnaire && qualifications?.length) {
        existUser.questionnaire.qualifications = qualifications;
      }
    }
    const updatedUser = await this.userRepository.update(id, existUser);

    if (!updatedUser) {
      throw new InternalServerErrorException(UPDATE_USER_ERROR_MESSAGE);
    }

    if (backgrounds) {
      updatedUser.backgrounds = backgrounds;
    }

    if (avatar) {
      updatedUser.avatar = avatar;
    }

    if (updatedUser.role === Role.coach && updatedUser.questionnaire && qualifications?.length) {
      updatedUser.questionnaire.qualifications = qualifications;
    }

    return updatedUser;
  }

  public async verifyUser(dto: AuthUserDTO): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_EMAIL_MESSAGE, [dto.email]));
    }
    const isMatch = await existUser.comparePassword(dto.password);

    if (!isMatch) {
      throw new UnauthorizedException(WRONG_PASSWORD_MESSAGE);
    }

    return existUser;
  }

  public async getUserById(id: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }
    const {backgrounds, avatar, qualifications} = await this.getFiles(existUser.role, existUser.avatarId, existUser.questionnaire?.qualificationIds);

    if (backgrounds) {
      existUser.backgrounds = backgrounds;
    }

    if (avatar) {
      existUser.avatar = avatar;
    }

    if (existUser.role === Role.coach && existUser.questionnaire && qualifications?.length) {
      existUser.questionnaire.qualifications = qualifications;
    }

    return existUser;
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_EMAIL_MESSAGE, [email]))
    }

    return existUser;
  }

  public async getUsersByRole(query: UsersQuery): Promise<UserEntity[]> {
    const users = await this.userRepository.findByRole(query);

    const result = Promise.all(
      users
        .filter((user) => user !== null)
        .map(async (user) => {
          const {backgrounds, avatar, qualifications} = await this.getFiles(user.role, user.avatarId, user.questionnaire?.qualificationIds);

          if (backgrounds) {
            user.backgrounds = backgrounds;
          }

          if (avatar) {
            user.avatar = avatar;
          }

          if (user.role === Role.coach && user.questionnaire && qualifications?.length) {
            user.questionnaire.qualifications = qualifications;
          }

          return user;
        })
    );

    return result;
  }

  public async getUserBalance(userId: string): Promise<BalanceEntity[]> {
    const existUser = await this.userRepository.findById(userId);

    if(!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [userId]));
    }
    const userBalance = await this.balanceRepository.findByUserId(userId);
    const result = await Promise.all(
      userBalance
        .filter((balance) => balance !== null)
        .map(async (balance) => {
          const video = await this.filesService.getFile(balance.training?.videoId as string);
          const background = await this.filesService.getFile(balance.training?.backgroundId as string);

          if ('training' in balance && typeof balance.training === 'object') {
            balance.training.video = video.toObject();
            balance.training.background = background.toObject()
          }

          return balance;
        })
    );

    return result;
  }

  public async updateOrCreateUserBalance(userId: string, trainingId: string, amount = DEFAULT_AMOUNT): Promise<BalanceEntity> {
    const existUser = await this.userRepository.findById(userId);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [userId]));
    }
    const balanceEntity = new BalanceEntity({userId, trainingId, amount});
    const userBalance = await this.balanceRepository.findByTrainingId(trainingId);

    if (userBalance) {
      balanceEntity.amount = userBalance.amount + amount;
      const balance = await this.balanceRepository.update(userBalance.id, balanceEntity);

      if (!balance) {
        throw new InternalServerErrorException(UPDATE_USER_BALANCE_ERROR_MESSAGE);
      }

      return balance;
    }

    return this.balanceRepository.create(balanceEntity);
  }

  public async useUserBalance(userId: string, trainingId: string): Promise<BalanceEntity> {
    const existUser = await this.userRepository.findById(userId);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [userId]));
    }
    const userBalance = await this.balanceRepository.findByTrainingId(trainingId);

    if (!userBalance) {
      throw new NotFoundException(createMessage(NOT_FOUND_BALANCE_BY_ID_MESSAGE, [trainingId]));
    }

    if (userBalance.amount === 0) {
      return userBalance;
    }
    const balanceEntity = new BalanceEntity({
      userId,
      trainingId,
      amount: userBalance.amount - DEFAULT_AMOUNT});
    const balance = await this.balanceRepository.update(userBalance.id, balanceEntity);

    if (!balance) {
      throw new InternalServerErrorException(UPDATE_USER_BALANCE_ERROR_MESSAGE);
    }

    return balance;
  }

  public async createToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID()
    };

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });

      await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

      return {accessToken, refreshToken};
    } catch (err) {
      const error = err instanceof Error ? err.message : err;
      this.logger.error(createMessage(TOKEN_GENERATE_ERROR, [error]));
      throw new InternalServerErrorException(TOKEN_CREATION_ERROR);
    }
  }

  public async deleteUserById(id: string): Promise<void> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    await this.userRepository.delete(id);
  }

  public async deleteUserAvatar(id: string): Promise<void> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    if (!existUser.avatarId) {
      return;
    }

    await this.filesService.deleteFile(existUser.avatarId);
    existUser.avatarId = null;
    await this.userRepository.update(id, existUser);
  }

  private async getFiles(userRole: Role, avatarId: string | null | undefined, qualificationIds?: string[] | null | undefined) {
    const file: FileRecord = {};
    const backgrounds = await this.filesService.getByFieldName(FieldName.Background);
    file.backgrounds = backgrounds
      .filter((background): background is FilesEntity => background !== null && background.subDirectory.includes(userRole))
      .map((background) => background.toObject())

    if (avatarId) {
      const avatar = await this.filesService.getFile(avatarId);
      file.avatar = avatar.toObject();
      file.backgrounds.concat(avatar.toObject());
    }

    if (qualificationIds?.length) {
      file.qualifications = await Promise.all(
        qualificationIds.map(async (qualification) => (await this.filesService.getFile(qualification)).toObject())
      )
    }

    return file;
  }
}
