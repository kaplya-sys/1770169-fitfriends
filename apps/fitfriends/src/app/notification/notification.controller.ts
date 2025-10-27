import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards
} from '@nestjs/common';
import {ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';

import {Route, TokenPayload} from '@1770169-fitfriends/types';
import {NotificationRDO} from '@1770169-fitfriends/rdo';
import {UUIDValidationPipe} from '@1770169-fitfriends/core';
import {fillDto} from '@1770169-fitfriends/helpers';

import {NotificationService} from './notification.service';
import {JWTAuthGuard} from '../guards/jwt-auth.guard';
import {
  DELETE_RESPONSE,
  FOUND_RESPONSE,
  NOT_FOUND_RESPONSE,
  NOTIFICATION_ID_PARAM,
  ROUTE_PREFIX,
  TAG,
  UNAUTHORIZED
} from './notification.constant';
import {RequestTokenPayload} from '../decorators/request-token-payload.decorator';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: FOUND_RESPONSE,
    type: NotificationRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.Root)
  public async index(
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const notifications = await this.notificationService.getNotificationsByUserId(tokenPayload.sub);

    return notifications.map((notification) => fillDto(NotificationRDO, notification.toObject(), {exposeDefaultValues: false}))
  }

  @ApiParam({
    name: NOTIFICATION_ID_PARAM.NAME,
    type: String,
    description: NOTIFICATION_ID_PARAM.DESCRIPTION,
    example: NOTIFICATION_ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: DELETE_RESPONSE
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
  @Delete(Route.DeleteNotification)
  public async delete(
    @Param('notificationId', UUIDValidationPipe) id: string,
  ) {
    await this.notificationService.deleteNotification(id);
  }
}
