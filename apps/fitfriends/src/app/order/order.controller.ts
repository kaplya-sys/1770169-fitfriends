import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';

import {Route, TokenPayload} from '@1770169-fitfriends/types';
import {OrderRDO, OrdersWithPaginationRDO} from '@1770169-fitfriends/rdo';
import {UUIDValidationPipe} from '@1770169-fitfriends/core';
import {CreateOrderDTO} from '@1770169-fitfriends/dto';
import {fillDto} from '@1770169-fitfriends/helpers';
import {OrdersQuery} from '@1770169-fitfriends/query';

import {
  BAD_REQUEST_RESPONSE,
  CREATED_RESPONSE,
  FOUND_RESPONSE,
  ID_PARAM,
  LIMIT_QUERY,
  NOT_FOUND_RESPONSE,
  ORDER_AMOUNT_ORDER_QUERY,
  ORDER_COUNT_ORDER_QUERY,
  PAGE_QUERY,
  ROUTE_PREFIX,
  TAG,
  UNAUTHORIZED,
  USER_ID_QUERY
} from './order.constant';
import {OrderService} from './order.service';
import {JWTAuthGuard} from '../guards/jwt-auth.guard';
import {RequestTokenPayload} from '../decorators/request-token-payload.decorator';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) {}

  @ApiQuery({
    name: ORDER_AMOUNT_ORDER_QUERY.NAME,
    type: String,
    description: ORDER_AMOUNT_ORDER_QUERY.DESCRIPTION,
    example: ORDER_AMOUNT_ORDER_QUERY.EXAMPLE,
    enum: ORDER_AMOUNT_ORDER_QUERY.ENUM,
    required: false
  })
  @ApiQuery({
    name: ORDER_COUNT_ORDER_QUERY.NAME,
    type: String,
    description: ORDER_COUNT_ORDER_QUERY.DESCRIPTION,
    example: ORDER_COUNT_ORDER_QUERY.EXAMPLE,
    enum: ORDER_COUNT_ORDER_QUERY.ENUM,
    required: false
  })
  @ApiQuery({
    name: USER_ID_QUERY.NAME,
    type: String,
    description: USER_ID_QUERY.DESCRIPTION,
    example: USER_ID_QUERY.EXAMPLE,
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
    type: OrdersWithPaginationRDO
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
  @Get(Route.Root)
  public async index(
    @Query() query: OrdersQuery
  ) {
    const orders = await this.orderService.getOrders(query);

    return fillDto(OrdersWithPaginationRDO, {
        ...orders,
        entities: orders.entities.map((order) => order.toObject())
      }, {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED_RESPONSE,
    type: OrderRDO
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
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.CreateOrder)
  public async create(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() dto: CreateOrderDTO,
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const newOrder = await this.orderService.createOrder(id, tokenPayload.sub, dto);

    return fillDto(OrderRDO, newOrder.toObject(), {exposeDefaultValues: false});
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
    type: OrderRDO
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
  @Get(Route.Order)
  public async show(
    @Param('orderId', UUIDValidationPipe) orderId: string
  ) {
    const order = await this.orderService.getOrderById(orderId);

    return fillDto(OrderRDO, order.toObject(), {exposeDefaultValues: false});
  }
}
