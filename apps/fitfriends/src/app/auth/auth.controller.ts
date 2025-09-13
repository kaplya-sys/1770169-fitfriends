import {
  Body,
  Controller,
  Delete,
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
import {
  AuthenticatedUserRDO,
  BalanceWithPaginationRDO,
  FriendRDO,
  FriendsWithPaginationRDO,
  TokenPayloadRDO,
  TokenRDO,
  UserRDO,
  UsersWithPaginationRDO
} from '@1770169-fitfriends/rdo';
import {
  FieldName,
  RequestFiles,
  RequestWithTokenPayload,
  RequestWithUser,
  Route
} from '@1770169-fitfriends/types';
import {BalanceQuery, FriendsQuery, UsersQuery} from '@1770169-fitfriends/query';
import {FilesTypeValidationPipe, UUIDValidationPipe} from '@1770169-fitfriends/core';

import {AuthService} from './auth.service';
import {JWTAuthGuard} from '../guards/jwt-auth.guard';
import {JWTRefreshGuard} from '../guards/jwt-refresh.guard';
import {LocalAuthGuard} from '../guards/local-auth.guard';
import {
  ACTIVE_QUERY,
  AUTHORIZED_RESPONSE,
  BAD_REQUEST_RESPONSE,
  CHECK_TOKEN_RESPONSE,
  CONFLICT_RESPONSE,
  CREATED_RESPONSE,
  DATA_TYPE,
  FOUND_RESPONSE,
  FRIEND_ID_PARAM,
  USER_ID_PARAM,
  LIMIT_QUERY,
  MAX_UPLOAD_FILES,
  NOT_FOUND_RESPONSE,
  PAGE_QUERY,
  REFRESH_TOKEN_RESPONSE,
  ROLE_QUERY,
  ROUTE_PREFIX,
  TAG,
  UNAUTHORIZED,
  UPDATED_RESPONSE,
  ID_PARAM,
  FRIEND_ID_QUERY
} from './auth.constant';
import {DELETED_RESPONSE} from '../training/training.constant';

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
    description: REFRESH_TOKEN_RESPONSE,
    type: TokenRDO
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
    description: CHECK_TOKEN_RESPONSE,
    type: TokenPayloadRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(Route.AuthCheck)
  public async checkToken(@Req() {user}: RequestWithTokenPayload) {
    return fillDto(TokenPayloadRDO, user);
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
    type: UserRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.Root)
  public async index(@Query() query: UsersQuery) {
    const users = await this.authService.getUsers(query);

    return fillDto(UsersWithPaginationRDO, {
      ...users,
      entities: users.entities.map((user) => user.toObject())
    }, {exposeDefaultValues: false});
  }

  @ApiQuery({
    name: ACTIVE_QUERY.NAME,
    type: Boolean,
    description: ACTIVE_QUERY.DESCRIPTION,
    example: ACTIVE_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: LIMIT_QUERY.NAME,
    type: Number,
    description: LIMIT_QUERY.DESCRIPTION,
    example: LIMIT_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: PAGE_QUERY.NAME,
    type: Number,
    description: PAGE_QUERY.DESCRIPTION,
    example: PAGE_QUERY.EXAMPLE,
    required: false
  })
  @ApiParam({
    name: USER_ID_PARAM.NAME,
    type: String,
    description: USER_ID_PARAM.DESCRIPTION,
    example: USER_ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: FOUND_RESPONSE,
    type: BalanceWithPaginationRDO
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
  public async showBalance(
    @Param('userId', UUIDValidationPipe) id: string,
    @Query() query: BalanceQuery
  ) {
    const balance = await this.authService.getUserBalance(id, query);

    return fillDto(BalanceWithPaginationRDO, {
      ...balance,
      entities: balance.entities.map((balance) => balance.toObject())
    }, {exposeDefaultValues: false});
  }

  @ApiParam({
    name: USER_ID_PARAM.NAME,
    type: String,
    description: USER_ID_PARAM.DESCRIPTION,
    example: USER_ID_PARAM.EXAMPLE
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
    name: USER_ID_PARAM.NAME,
    type: String,
    description: USER_ID_PARAM.DESCRIPTION,
    example: USER_ID_PARAM.EXAMPLE
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

  @ApiQuery({
    name: FRIEND_ID_QUERY.NAME,
    type: String,
    description: FRIEND_ID_QUERY.DESCRIPTION,
    example: FRIEND_ID_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: LIMIT_QUERY.NAME,
    type: Number,
    description: LIMIT_QUERY.DESCRIPTION,
    example: LIMIT_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: PAGE_QUERY.NAME,
    type: Number,
    description: PAGE_QUERY.DESCRIPTION,
    example: PAGE_QUERY.EXAMPLE,
    required: false
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: FOUND_RESPONSE,
    type: FriendsWithPaginationRDO
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
  @Get(Route.Friends)
  public async getFriends(
    @Param('userId', UUIDValidationPipe) userId: string,
    @Query() query: FriendsQuery
  ) {
    const friends = await this.authService.getFriendsByUserId(userId, query);

    return fillDto(FriendsWithPaginationRDO, {
      ...friends,
      entities: friends.entities.map((friend) => friend.toObject())
    }, {exposeDefaultValues: false});
  }

  @ApiParam({
    name: USER_ID_PARAM.NAME,
    type: String,
    description: USER_ID_PARAM.DESCRIPTION,
    example: USER_ID_PARAM.EXAMPLE
  })
  @ApiParam({
    name: FRIEND_ID_PARAM.NAME,
    type: String,
    description: FRIEND_ID_PARAM.DESCRIPTION,
    example: FRIEND_ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED_RESPONSE,
    type: FriendRDO
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
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.AddFriend)
  public async addUserFriend(
    @Param('userId', UUIDValidationPipe) userId: string,
    @Param('friendId', UUIDValidationPipe) friendId: string
  ) {
    const friend = await this.authService.addFriend(userId, friendId);

    return fillDto(FriendRDO, friend.toObject(), {exposeDefaultValues: false});
  }

  @ApiParam({
    name: ID_PARAM.NAME,
    type: String,
    description: ID_PARAM.DESCRIPTION,
    example: ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: UPDATED_RESPONSE,
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(Route.DeleteFriend)
  public async deleteUserFriend(
    @Param('id', UUIDValidationPipe) id: string
  ) {
    this.authService.deleteFriend(id)
  }

  @ApiParam({
    name: USER_ID_PARAM.NAME,
    type: String,
    description: USER_ID_PARAM.DESCRIPTION,
    example: USER_ID_PARAM.EXAMPLE
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
  @UseInterceptors(FileFieldsInterceptor([
    {name: FieldName.Avatar, maxCount: MAX_UPLOAD_FILES}
  ]))
  @HttpCode(HttpStatus.OK)
  @Patch(Route.EditUser)
  public async update(
    @UploadedFiles() files: RequestFiles,
    @Body() dto: UpdateUserDTO,
    @Param('userId', UUIDValidationPipe) id: string
  ) {
    const user = await this.authService.updateUser(id, dto, files);

    return fillDto(UserRDO, user.toObject(), {exposeDefaultValues: false});
  }

  @ApiParam({
    name: USER_ID_PARAM.NAME,
    type: String,
    description: USER_ID_PARAM.DESCRIPTION,
    example: USER_ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: UPDATED_RESPONSE,
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(Route.DeleteUserAvatar)
  public async deleteUserAvatar(
    @Param('userId', UUIDValidationPipe) id: string
  ) {
    this.authService.deleteUserAvatar(id);
  }

  @ApiParam({
    name: USER_ID_PARAM.NAME,
    type: String,
    description: USER_ID_PARAM.DESCRIPTION,
    example: USER_ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: DELETED_RESPONSE
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(Route.DeleteTraining)
  public async delete(@Param('id', UUIDValidationPipe) id: string) {
    this.authService.deleteUserById(id);
  }

  @ApiParam({
    name: USER_ID_PARAM.NAME,
    type: String,
    description: USER_ID_PARAM.DESCRIPTION,
    example: USER_ID_PARAM.EXAMPLE
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
