import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import {ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';

import {Route, TokenPayload} from '@1770169-fitfriends/types';
import {MongoIdValidationPipe, UUIDValidationPipe} from '@1770169-fitfriends/core';
import {fillDto} from '@1770169-fitfriends/helpers';
import {SubscriberRDO} from '@1770169-fitfriends/rdo';

import {ROUTE_PREFIX, TAG} from './subscriber.constants';
import {SubscriberService} from './subscriber.service';
import {RequestTokenPayload} from '../decorators/request-token-payload.decorator';
import {
  BAD_REQUEST_RESPONSE,
  FOUND_RESPONSE,
  ID_PARAM,
  UNAUTHORIZED,
  USER_ID_PARAM
} from '../auth/auth.constant';
import {JWTAuthGuard} from '../guards/jwt-auth.guard';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class SubscriberController {
  constructor(
    private readonly subscriberService: SubscriberService
  ) {}

   @ApiParam({
    name: USER_ID_PARAM.NAME,
    type: String,
    description: USER_ID_PARAM.DESCRIPTION,
    example: USER_ID_PARAM.EXAMPLE
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(Route.AddSubscriber)
  public async subscribe(
    @RequestTokenPayload() tokenPayload: TokenPayload,
    @Param('userId', UUIDValidationPipe) id: string,
  ) {
    this.subscriberService.addSubscriber(tokenPayload.email, id);
  }

   @ApiParam({
    name: ID_PARAM.NAME,
    type: String,
    description: ID_PARAM.DESCRIPTION,
    example: ID_PARAM.EXAMPLE
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(Route.DeleteSubscriber)
  public async unsubscribe(
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    this.subscriberService.deleteSubscriber(id);
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
    type: SubscriberRDO
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
  @Get(Route.Subscribers)
  public async getSubscribers(
    @Param('userId', UUIDValidationPipe) id: string,
  ) {
    const subscribers = await this.subscriberService.getSubscribersByUserId(id);

    return subscribers.map((subscriber) => fillDto(SubscriberRDO, subscriber.toObject(), {exposeDefaultValues: false}));
  }
}
