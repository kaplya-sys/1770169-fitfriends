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
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {FileFieldsInterceptor} from '@nestjs/platform-express';

import {FilesTypeValidationPipe, ParseFormDataJsonPipe} from '@1770169-fitfriends/core';
import {} from '@1770169-fitfriends/dto';
import {fillDto} from '@1770169-fitfriends/helpers';
import {} from '@1770169-fitfriends/rdo';
import {} from '@1770169-fitfriends/query';
import {FieldName, Route, RequestFiles} from '@1770169-fitfriends/types';

import {
  MAX_UPLOAD_FILES,
  PRODUCT_CREATED_RESPONSE,
  PRODUCT_DATE_QUERY,
  PRODUCT_DELETED_RESPONSE,
  PRODUCT_FOUND_RESPONSE,
  PRODUCT_ID_PARAM,
  PRODUCT_PRICE_QUERY,
  PRODUCT_STRINGS_QUERY,
  PRODUCT_TYPE_QUERY,
  PRODUCT_UPDATED_RESPONSE,
  PRODUCTS_FOUND_RESPONSE,
  ROUTE_PREFIX,
  TAG
} from './training.constant';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';
import {TrainingService} from './training.service';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PRODUCT_CREATED_RESPONSE,
    type: ProductRDO
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.AddProduct)
  @UseInterceptors(FileFieldsInterceptor([
    {name: FieldName.File, maxCount: MAX_UPLOAD_FILES}
  ]))
  public async create(
    @UploadedFiles(FilesTypeValidationPipe) file: RequestFiles,
    @Body(ParseFormDataJsonPipe) dto: CreateProductDTO
  ) {
    const newProduct = await this.productsService.createProduct(dto, file);

    return fillDto(ProductRDO, newProduct.toObject());
  }

  @ApiQuery({
    name: PRODUCT_TYPE_QUERY.NAME,
    type: [String],
    description: PRODUCT_TYPE_QUERY.DESCRIPTION,
    example: PRODUCT_TYPE_QUERY.EXAMPLE,
    isArray: true,
    enum: PRODUCT_TYPE_QUERY.ENUM,
    required: false,
  })
  @ApiQuery({
    name: PRODUCT_STRINGS_QUERY.NAME,
    type: [String],
    description: PRODUCT_STRINGS_QUERY.DESCRIPTION,
    example: PRODUCT_STRINGS_QUERY.EXAMPLE,
    isArray: true,
    enum: PRODUCT_STRINGS_QUERY.ENUM,
    required: false,
  })
  @ApiQuery({
    name: PRODUCT_PRICE_QUERY.NAME,
    type: String,
    description: PRODUCT_PRICE_QUERY.DESCRIPTION,
    example: PRODUCT_PRICE_QUERY.EXAMPLE,
    enum: PRODUCT_PRICE_QUERY.ENUM,
    required: false,
  })
  @ApiQuery({
    name: PRODUCT_DATE_QUERY.NAME,
    type: String,
    description: PRODUCT_DATE_QUERY.DESCRIPTION,
    example: PRODUCT_DATE_QUERY.EXAMPLE,
    enum: PRODUCT_DATE_QUERY.ENUM,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PRODUCT_UPDATED_RESPONSE,
    type: ProductsWithPaginationRDO
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.Products)
  public async index(@Query() query: ProductsQuery) {
    const products = await this.productsService.getProducts(query);

    return fillDto(
      ProductsWithPaginationRDO,
      {
        ...products,
        entities: products.entities.map((product) => product.toObject())
      },
      {exposeDefaultValues: false}
    );
  }

  @ApiParam({
    name: PRODUCT_ID_PARAM.NAME,
    type: String,
    description: PRODUCT_ID_PARAM.DESCRIPTION,
    example: PRODUCT_ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PRODUCTS_FOUND_RESPONSE,
    type: ProductRDO
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.Product)
  public async show(@Param('id') id: string) {
    const product = await this.productsService.getProductById(id);

    return fillDto(ProductRDO, product.toObject(), {exposeDefaultValues: false});
  }

  @ApiParam({
    name: PRODUCT_ID_PARAM.NAME,
    type: String,
    description: PRODUCT_ID_PARAM.DESCRIPTION,
    example: PRODUCT_ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PRODUCT_FOUND_RESPONSE,
    type: ProductRDO
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(Route.EditProduct)
  @UseInterceptors(FileFieldsInterceptor([
    {name: FieldName.File, maxCount: MAX_UPLOAD_FILES}
  ]))
  public async update(
    @UploadedFiles(FilesTypeValidationPipe) file: RequestFiles,
    @Param('id') id: string,
    @Body(ParseFormDataJsonPipe) dto: UpdateProductDTO
  ) {
    const product = await this.productsService.updateProduct(id, dto, file);

    return fillDto(ProductRDO, product.toObject(), {exposeDefaultValues: false});
  }

  @ApiParam({
    name: PRODUCT_ID_PARAM.NAME,
    type: String,
    description: PRODUCT_ID_PARAM.DESCRIPTION,
    example: PRODUCT_ID_PARAM.EXAMPLE
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PRODUCT_DELETED_RESPONSE
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(Route.DeleteProduct)
  public async delete(@Param('id') id: string) {
    this.productsService.deleteProductById(id);
  }
}
