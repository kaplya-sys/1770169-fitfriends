import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';

import {CreateUserDTO} from '@1770169-guitar/dto';
import {fillDto} from '@1770169-guitar/helpers';
import {AuthenticatedUserRDO, UserRDO} from '@1770169-guitar/rdo';
import {RequestWithTokenPayload, RequestWithUser, Route} from '@1770169-guitar/types';

import {AuthService} from './auth.service';
import {JWTAuthGuard} from './guards/jwt-auth.guard';
import {JWTRefreshGuard} from './guards/jwt-refresh.guard';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {
  CHECK_TOKEN_RESPONSE,
  PRODUCT_ID_PARAM,
  REFRESH_TOKEN_RESPONSE,
  ROUTE_PREFIX,
  TAG,
  USER_CREATED_RESPONSE,
  USER_FOUND_RESPONSE,
  USER_LOGIN_RESPONSE
} from './auth.constant';
import {ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';

import {Role} from '@1770169-guitar/models';



@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: USER_CREATED_RESPONSE,
    type: AuthenticatedUserRDO
  })
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.Register)
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.registerUser({...dto, role: Role.admin});
    const token = await this.authService.createToken(newUser);

    return fillDto(AuthenticatedUserRDO, {...newUser, ...token});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_LOGIN_RESPONSE,
    type: AuthenticatedUserRDO
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(Route.Login)
  public async login(@Req() {user}: RequestWithUser) {
    const token = await this.authService.createToken(user);

    return fillDto(AuthenticatedUserRDO, {...user, ...token});
  }

  @ApiParam({
    name: PRODUCT_ID_PARAM.NAME,
    type: String,
    description: PRODUCT_ID_PARAM.DESCRIPTION,
    example: PRODUCT_ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_FOUND_RESPONSE,
    type: UserRDO
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.User)
  public async show(@Param('userId') id: string) {
    const userEntity = await this.authService.getUserById(id);

    return fillDto(UserRDO, userEntity.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: REFRESH_TOKEN_RESPONSE
  })
  @UseGuards(JWTRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post(Route.RefreshToken)
  public async refreshToken(@Req() {user}: RequestWithUser) {
    return this.authService.createToken(user);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CHECK_TOKEN_RESPONSE
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(Route.AuthCheck)
  public async checkToken(@Req() {user}: RequestWithTokenPayload) {
    return user;
  }
}
