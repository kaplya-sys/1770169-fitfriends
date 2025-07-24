import crypto from 'node:crypto'

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

import {AuthUserDTO, CreateUserDTO} from '@1770169-guitar/dto';
import {JwtConfig} from '@1770169-guitar/config';
import {createJWTPayload, createMessage} from '@1770169-guitar/helpers';

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
import {Token, User} from '@1770169-guitar/types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(JwtConfig.KEY)private readonly jwtOptions: ConfigType<typeof JwtConfig>
  ) {}

  public async registerUser(dto: CreateUserDTO): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if(existUser) {
      throw new ConflictException(createMessage(USER_EXISTS_MESSAGE, [dto.email]));
    }
    const userEntity = await new UserEntity(dto).setPassword(dto.password);

    return this.userRepository.save(userEntity);
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

      await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

      return {accessToken, refreshToken};
    } catch (err) {
      const error = err instanceof Error ? err.message : err;
      this.logger.error(createMessage(TOKEN_GENERATE_ERROR, [error]));
      throw new InternalServerErrorException(TOKEN_CREATION_ERROR);
    }
  }
}
