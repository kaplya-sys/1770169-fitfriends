import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {FileFieldsInterceptor} from '@nestjs/platform-express';
import {ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';

import {CreateCoachQuestionnaireDTO, CreateUserDTO, CreateUserQuestionnaireDTO, UpdateUserDTO} from '@1770169-fitfriends/dto';
import {fillDto} from '@1770169-fitfriends/helpers';
import {AuthenticatedUserRDO, UserRDO} from '@1770169-fitfriends/rdo';
import {
  FieldName,
  RequestFiles,
  RequestWithTokenPayload,
  RequestWithUser,
  Route,
  TokenPayload
} from '@1770169-fitfriends/types';

import {AuthService} from './auth.service';
import {JWTAuthGuard} from './guards/jwt-auth.guard';
import {JWTRefreshGuard} from './guards/jwt-refresh.guard';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {
  CHECK_TOKEN_RESPONSE,
  MAX_UPLOAD_FILES,
  PRODUCT_ID_PARAM,
  REFRESH_TOKEN_RESPONSE,
  ROUTE_PREFIX,
  TAG,
  USER_CREATED_RESPONSE,
  USER_FOUND_RESPONSE,
  USER_LOGIN_RESPONSE
} from './auth.constant';
import {RequestTokenPayload} from '../decorators/request-token-payload.decorator';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: USER_CREATED_RESPONSE,
    type: AuthenticatedUserRDO
  })
  @UseInterceptors(FileFieldsInterceptor([
    {name: FieldName.Avatar, maxCount: MAX_UPLOAD_FILES}
  ]))
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.Register)
  public async create(
    @UploadedFiles() files: RequestFiles,
    @Body() dto: CreateUserDTO
  ) {
    const newUser = await this.authService.registerUser(dto, files);
    const token = await this.authService.createToken(newUser);

    return fillDto(AuthenticatedUserRDO, {...newUser, ...token});
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: USER_CREATED_RESPONSE,
    type: AuthenticatedUserRDO
  })
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.Register)
  public async createUserQuestionnaire(
    @Body() dto: CreateUserQuestionnaireDTO,
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const user = await this.authService.addUserQuestionnaire(tokenPayload.sub, dto);

    return fillDto(UserRDO, user.toObject(), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: USER_CREATED_RESPONSE,
    type: AuthenticatedUserRDO
  })
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.Register)
  public async createCoachQuestionnaire(
    @Body() dto: CreateCoachQuestionnaireDTO,
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const user = await this.authService.addCoachQuestionnaire(tokenPayload.sub, dto);

    return fillDto(UserRDO, user.toObject(), {exposeDefaultValues: false});
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(Route.EditUser)
  public async update(
    @Body() dto: UpdateUserDTO,
    @Param('userId') id: string
  ) {
    const user = await this.authService.updateUser(id, dto);

    return fillDto(UserRDO, user.toObject(), {exposeDefaultValues: false});
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
    const user = await this.authService.getUserById(id);

    return fillDto(UserRDO, user.toObject(), {exposeDefaultValues: false});
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
