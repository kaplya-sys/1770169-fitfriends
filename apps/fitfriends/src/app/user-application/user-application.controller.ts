import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import {ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';

import {CreateUserApplicationDTO, UpdateUserApplicationDTO} from '@1770169-fitfriends/dto';
import {Route, TokenPayload} from '@1770169-fitfriends/types';

import {
  APPLICATION_ID_PARAM,
  BAD_REQUEST_RESPONSE,
  CREATED_RESPONSE,
  FOUND_RESPONSE,
  NOT_FOUND_RESPONSE,
  ROUTE_PREFIX,
  TAG,
  UNAUTHORIZED,
  UPDATED_RESPONSE
} from './user-application.constant';
import {UserApplicationService} from './user-application.service';
import {JWTAuthGuard} from '../guards/jwt-auth.guard';
import {RequestTokenPayload} from '../decorators/request-token-payload.decorator';
import {UUIDValidationPipe} from '@1770169-fitfriends/core';
import {fillDto} from '@1770169-fitfriends/helpers';
import {UserApplicationRDO} from '@1770169-fitfriends/rdo';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class UserApplicationController {
  constructor(
    private readonly userApplicationService: UserApplicationService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: FOUND_RESPONSE,
    type: UserApplicationRDO
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.Root)
  public async getUserApplications(
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const userApplications = await this.userApplicationService.getUserApplications(tokenPayload.sub);

    return userApplications.map((userApplication) => fillDto(UserApplicationRDO, userApplication.toObject(), {exposeDefaultValues: false}))
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED_RESPONSE,
    type: UserApplicationRDO
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: NOT_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.CreateApplication)
  public async create(
    @Body() dto: CreateUserApplicationDTO,
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const userApplication = await this.userApplicationService.createUserApplication(tokenPayload, dto);

    return fillDto(UserApplicationRDO, userApplication.toObject(), {exposeDefaultValues: false});
  }

  @ApiParam({
    name: APPLICATION_ID_PARAM.NAME,
    type: String,
    description: APPLICATION_ID_PARAM.DESCRIPTION,
    example: APPLICATION_ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: UPDATED_RESPONSE,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST_RESPONSE
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(Route.UpdateApplication)
  public async update(
    @Body() dto: UpdateUserApplicationDTO,
    @Param('applicationId', UUIDValidationPipe) id: string
  ) {
    await this.userApplicationService.updateUserApplication(id, dto);
  }

}
