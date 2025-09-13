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
import {FieldName, FileRecord, RequestFiles, Token, User, Pagination} from '@1770169-fitfriends/types';
import {BalanceQuery, FriendsQuery, UsersQuery} from '@1770169-fitfriends/query';

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
  NOT_FOUND_QUESTIONNAIRE_MESSAGE,
  NOT_FOUND_FRIEND_MESSAGE,
  ID_ERROR_MESSAGE
} from './auth.constant';
import {BalanceEntity} from '../balance/balance.entity';
import {BalanceRepository} from '../balance/balance.repository';
import {RefreshTokenService} from '../refresh-token/refresh-token.service';
import {FilesEntity} from '../files/files.entity';
import {FilesService} from '../files/files.service';
import {QuestionnaireRepository} from '../questionnaire/questionnaire.repository';
import {QuestionnaireEntity} from '../questionnaire/questionnaire.entity';
import {FriendRepository} from '../friend/friend.repository';
import {FriendEntity} from '../friend/friend.entity';

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
    private readonly friendRepository: FriendRepository,
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

  public async getUsers(query: UsersQuery): Promise<Pagination<UserEntity>> {
    const users = await this.userRepository.find(query);
    const entities = await Promise.all(
      users.entities.map(async (entity) => {
        const {backgrounds, avatar, qualifications} = await this.getFiles(entity.role, entity.avatarId, entity.questionnaire?.qualificationIds);

        if (backgrounds) {
          entity.backgrounds = backgrounds;
        }

        if (avatar) {
          entity.avatar = avatar;
        }

        if (entity.role === Role.coach && entity.questionnaire && qualifications?.length) {
          entity.questionnaire.qualifications = qualifications;
        }

        return entity;
      })
    );
    users.entities = entities;

    return users;
  }

  public async getUserBalance(userId: string, query?: BalanceQuery): Promise<Pagination<BalanceEntity>> {
    const existUser = await this.userRepository.findById(userId);

    if(!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [userId]));
    }
    const userBalance = await this.balanceRepository.findByUserId(userId, query);
    const entities = await Promise.all(
      userBalance.entities
        .map(async (entity) => {
          const video = await this.filesService.getFile(entity.training?.videoId as string);
          const background = await this.filesService.getFile(entity.training?.backgroundId as string);

          if ('training' in entity && typeof entity.training === 'object') {
            entity.training.video = video.toObject();
            entity.training.background = background.toObject()
          }

          return entity;
        })
    );
    userBalance.entities = entities;

    return userBalance;
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

  public async addFriend(userId: string, friendId: string): Promise<FriendEntity> {
    if (userId === friendId) {
      throw new ConflictException(ID_ERROR_MESSAGE);
    }
    const existUser = await this.userRepository.findById(userId);
    const existUserOf = await this.userRepository.findById(friendId);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [userId]));
    }

    if (!existUserOf) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [friendId]));
    }
    const {backgrounds, avatar, qualifications} = await this.getFiles(existUserOf.role, existUserOf.avatarId, existUserOf.questionnaire?.qualificationIds);
    const existFriend = await this.friendRepository.findByUserIdAndFriendId(userId, friendId);

    if (existFriend) {
      if (existFriend.friend) {
        if (backgrounds) {
          existFriend.friend.backgrounds = backgrounds;
        }

        if (avatar) {
          existFriend.friend.avatar = avatar;
        }

        if (existFriend.friend.role === Role.coach && existFriend.friend.questionnaire && qualifications?.length) {
          existFriend.friend.questionnaire.qualifications = qualifications;
        }
      }

      return existFriend;
    }
    const friendEntity = new FriendEntity({
      userId,
      friendId
    });
    const newFriend = await this.friendRepository.save(friendEntity);
    newFriend.friend = existUserOf;

    if (backgrounds) {
      newFriend.friend.backgrounds = backgrounds;
    }

    if (avatar) {
      newFriend.friend.avatar = avatar;
    }

    if (newFriend.friend.role === Role.coach && newFriend.friend.questionnaire && qualifications?.length) {
      newFriend.friend.questionnaire.qualifications = qualifications;
    }

    return newFriend;
  }

  public async deleteFriend(id: string): Promise<void> {
    const existFriend = await this.friendRepository.findById(id);

    if (!existFriend) {
      throw new NotFoundException(createMessage(NOT_FOUND_FRIEND_MESSAGE, [id]));
    }

    return this.friendRepository.delete(id);
  }

  public async getFriendsByUserId(userId: string, query?: FriendsQuery): Promise<Pagination<FriendEntity>> {
    const friends = await this.friendRepository.findByUserId(userId, query);
    const entities = await Promise.all(
      friends.entities.map(async (entity) => {
        if (entity.friend) {
          const {backgrounds, avatar, qualifications} = await this.getFiles(entity.friend.role, entity.friend.avatarId, entity.friend.questionnaire?.qualificationIds);
          entity.friend.backgrounds = backgrounds;
          entity.friend.avatar = avatar;

          if (entity.friend.role === Role.coach && entity.friend.questionnaire && qualifications?.length) {
            entity.friend.questionnaire.qualifications = qualifications;
          }
        }

        return entity;
      })
    );
    friends.entities = entities;

    return friends;
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
