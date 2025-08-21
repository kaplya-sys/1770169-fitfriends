import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {FileFieldsInterceptor} from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import {
  AuthUserDTO,
  CreateCoachQuestionnaireDTO,
  CreateUserDTO,
  CreateUserQuestionnaireDTO,
  CreateUserSwaggerDTO,
  UpdateUserDTO
} from '@1770169-fitfriends/dto';
import {fillDto} from '@1770169-fitfriends/helpers';
import {AuthenticatedUserRDO, BalanceRDO, UserRDO} from '@1770169-fitfriends/rdo';
import {
  FieldName,
  RequestFiles,
  RequestWithTokenPayload,
  RequestWithUser,
  Route
} from '@1770169-fitfriends/types';
import {UsersQuery} from '@1770169-fitfriends/query';
import {FilesTypeValidationPipe, UUIDValidationPipe} from '@1770169-fitfriends/core';

import {AuthService} from './auth.service';
import {JWTAuthGuard} from '../guards/jwt-auth.guard';
import {JWTRefreshGuard} from '../guards/jwt-refresh.guard';
import {LocalAuthGuard} from '../guards/local-auth.guard';
import {
  AUTHORIZED_RESPONSE,
  BAD_REQUEST_RESPONSE,
  CONFLICT_RESPONSE,
  CREATED_RESPONSE,
  DATA_TYPE,
  FOUND_RESPONSE,
  ID_PARAM,
  MAX_UPLOAD_FILES,
  NOT_FOUND_RESPONSE,
  ROLE_QUERY,
  ROUTE_PREFIX,
  TAG,
  UNAUTHORIZED,
  UPDATED_RESPONSE
} from './auth.constant';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED_RESPONSE,
    type: AuthenticatedUserRDO
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CONFLICT_RESPONSE
  })
  @ApiConsumes(DATA_TYPE)
  @ApiBody({
    type: CreateUserSwaggerDTO
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

    return fillDto(AuthenticatedUserRDO, {...newUser.toObject(), ...token}, {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AUTHORIZED_RESPONSE,
    type: AuthenticatedUserRDO
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @ApiBody({
      type: AuthUserDTO
    })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(Route.Login)
  public async login(@Req() {user}: RequestWithUser) {
    const token = await this.authService.createToken(user);

    return fillDto(AuthenticatedUserRDO, {...user, ...token});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AUTHORIZED_RESPONSE,
    type: AuthenticatedUserRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post(Route.RefreshToken)
  public async refreshToken(@Req() {user}: RequestWithUser) {
    return this.authService.createToken(user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AUTHORIZED_RESPONSE,
    type: AuthenticatedUserRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(Route.AuthCheck)
  public async checkToken(@Req() {user}: RequestWithTokenPayload) {
    return user;
  }

  @ApiQuery({
    name: ROLE_QUERY.NAME,
    description: ROLE_QUERY.DESCRIPTION,
    enum: ROLE_QUERY.ENUM,
    example: ROLE_QUERY.EXAMPLE,
    required: false
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: FOUND_RESPONSE,
    type: BalanceRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.Root)
  public async getUsersByRole(@Query() query: UsersQuery) {
    const users = await this.authService.getUsersByRole(query);

    return users.map((user) => fillDto(UserRDO, user.toObject(), {exposeDefaultValues: false}));
  }

  @ApiParam({
    name: ID_PARAM.NAME,
    type: String,
    description: ID_PARAM.DESCRIPTION,
    example: ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: FOUND_RESPONSE,
    type: BalanceRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.Balance)
  public async showBalance(@Param('userId', UUIDValidationPipe) id: string) {
    const balance = await this.authService.getUserBalance(id);

    return balance.map((item) => fillDto(BalanceRDO, item.toObject(), {exposeDefaultValues: false}));
  }

  @ApiParam({
    name: ID_PARAM.NAME,
    type: String,
    description: ID_PARAM.DESCRIPTION,
    example: ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED_RESPONSE,
    type: UserRDO
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CONFLICT_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseInterceptors(FileFieldsInterceptor([
    {name: FieldName.Qualification}
  ]))
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.CreateUserQuestionnaire)
  public async createUserQuestionnaire(
    @Body() dto: CreateUserQuestionnaireDTO,
    @Param('userId', UUIDValidationPipe) id: string
  ) {
    const user = await this.authService.addQuestionnaire(id, dto);

    return fillDto(UserRDO, user.toObject(), {exposeDefaultValues: false});
  }

  @ApiParam({
    name: ID_PARAM.NAME,
    type: String,
    description: ID_PARAM.DESCRIPTION,
    example: ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED_RESPONSE,
    type: UserRDO
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CONFLICT_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseInterceptors(FileFieldsInterceptor([
    {name: FieldName.Qualification}
  ]))
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.CreateCoachQuestionnaire)
  public async createCoachQuestionnaire(
    @UploadedFiles(FilesTypeValidationPipe) files: RequestFiles,
    @Body() dto: CreateCoachQuestionnaireDTO,
    @Param('userId', UUIDValidationPipe) id: string
  ) {
    const user = await this.authService.addQuestionnaire(id, dto, files);

    return fillDto(UserRDO, user.toObject(), {exposeDefaultValues: false});
  }

  @ApiParam({
    name: ID_PARAM.NAME,
    type: String,
    description: ID_PARAM.DESCRIPTION,
    example: ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: UPDATED_RESPONSE,
    type: UserRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(Route.EditUser)
  public async update(
    @Body() dto: UpdateUserDTO,
    @Param('userId', UUIDValidationPipe) id: string
  ) {
    const user = await this.authService.updateUser(id, dto);

    return fillDto(UserRDO, user.toObject(), {exposeDefaultValues: false});
  }

  @ApiParam({
    name: ID_PARAM.NAME,
    type: String,
    description: ID_PARAM.DESCRIPTION,
    example: ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: FOUND_RESPONSE,
    type: UserRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.User)
  public async show(@Param('userId', UUIDValidationPipe) id: string) {
    const user = await this.authService.getUserById(id);

    return fillDto(UserRDO, user.toObject(), {exposeDefaultValues: false});
  }
}
