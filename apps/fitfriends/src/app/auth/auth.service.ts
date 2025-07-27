import crypto from 'node:crypto';

import {ConfigType} from '@nestjs/config';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {JwtConfig} from '@1770169-fitfriends/config';
import {AuthUserDTO, CreateUserDTO, UpdateUserDTO} from '@1770169-fitfriends/dto';
import {createJWTPayload, createMessage} from '@1770169-fitfriends/helpers';
import {Token, User} from '@1770169-fitfriends/types';

import {UserEntity} from '../user/user.entity';
import {UserRepository} from '../user/user.repository';
import {
  NOT_FOUND_BY_EMAIL_MESSAGE,
  NOT_FOUND_BY_ID_MESSAGE,
  TOKEN_CREATION_ERROR,
  TOKEN_GENERATE_ERROR,
  USER_EXISTS_MESSAGE,
  WRONG_PASSWORD_MESSAGE
} from './auth.constant';
import {RefreshTokenService} from '../refresh-token/refresh-token.service';
import {FilesService} from '../files/files.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly filesService: FilesService,
    @Inject(JwtConfig.KEY)private readonly jwtOptions: ConfigType<typeof JwtConfig>
  ) {}
  public async registerUser(dto: CreateUserDTO, files: Express.Multer.File[]): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if(existUser) {
      throw new NotFoundException(createMessage(USER_EXISTS_MESSAGE, [dto.email]));
    }

    const file = await this.filesService.saveFile(files);

    const userEntity = await new UserEntity({...dto, avatar: file.id as string, background: ''}).setPassword(dto.password);
    return this.userRepository.save(userEntity);
  }
  public async updateUser(id: string, dto: UpdateUserDTO): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }
    let hasUpdates = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existUser[key as keyof UserEntity] !== value) {
        existUser[key as keyof UserEntity] = value;
        hasUpdates = true;
      }
    }

    if (!hasUpdates) {
      return existUser;
    }

    return this.userRepository.update(id, existUser);
  }

  public async verifyUser(dto: AuthUserDTO): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(dto.email);
    if(!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_EMAIL_MESSAGE, [dto.email]));
    }
    const isMatch = await existUser.comparePassword(dto.password);

    if(!isMatch) {
      throw new UnauthorizedException(WRONG_PASSWORD_MESSAGE);
    }

    return existUser;
  }

  public async getUserById(id: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);

    if(!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return existUser;
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(email);

    if(!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_EMAIL_MESSAGE, [email]))
    }

    return existUser;
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
}
