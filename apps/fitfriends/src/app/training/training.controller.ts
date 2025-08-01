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
import {CreateTrainingDTO, UpdateTrainingDTO} from '@1770169-fitfriends/dto';
import {fillDto} from '@1770169-fitfriends/helpers';
import {TrainingRDO, TrainingsWithPaginationRDO} from '@1770169-fitfriends/rdo';
import {TrainingsQuery} from '@1770169-fitfriends/query';
import {
  FieldName,
  Route,
  RequestFiles,
  TokenPayload
} from '@1770169-fitfriends/types';

import {
  MAX_UPLOAD_FILES,
  CREATED_RESPONSE,
  FOUND_RESPONSE,
  ROUTE_PREFIX,
  TAG,
  NOT_FOUND_RESPONSE,
  CONFLICT_RESPONSE,
  TRAINING_CALORIES_MAX_QUERY,
  TRAINING_CALORIES_MIN_QUERY,
  TRAINING_PRICE_ORDER_QUERY,
  TRAINING_PRICE_MIN_QUERY,
  TRAINING_PRICE_MAX_QUERY,
  TRAINING_DATE_ORDER_QUERY,
  LIMIT_QUERY,
  PAGE_QUERY,
  ID_PARAM,
  UPDATED_RESPONSE,
  BAD_REQUEST_RESPONSE,
  DELETED_RESPONSE,
  UNAUTHORIZED
} from './training.constant';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';
import {TrainingService} from './training.service';
import {RequestTokenPayload} from '../decorators/request-token-payload.decorator';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED_RESPONSE,
    type: TrainingRDO
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
  @Post(Route.Create)
  @UseInterceptors(FileFieldsInterceptor([
    {name: FieldName.Video, maxCount: MAX_UPLOAD_FILES}
  ]))
  public async create(
    @UploadedFiles(FilesTypeValidationPipe) file: RequestFiles,
    @Body(ParseFormDataJsonPipe) dto: CreateTrainingDTO,
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const newTraining = await this.trainingService.createTraining(tokenPayload, dto, file);

    return fillDto(TrainingRDO, newTraining.toObject());
  }

  @ApiQuery({
    name: TRAINING_CALORIES_MAX_QUERY.NAME,
    type: TRAINING_CALORIES_MAX_QUERY.TYPE,
    description: TRAINING_CALORIES_MAX_QUERY.DESCRIPTION,
    example: TRAINING_CALORIES_MAX_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: TRAINING_CALORIES_MIN_QUERY.NAME,
    type: TRAINING_CALORIES_MIN_QUERY.TYPE,
    description: TRAINING_CALORIES_MIN_QUERY.DESCRIPTION,
    example: TRAINING_CALORIES_MIN_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: TRAINING_PRICE_MIN_QUERY.NAME,
    type: TRAINING_PRICE_MIN_QUERY.TYPE,
    description: TRAINING_PRICE_MIN_QUERY.DESCRIPTION,
    example: TRAINING_PRICE_MIN_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: TRAINING_PRICE_MAX_QUERY.NAME,
    type: TRAINING_PRICE_MAX_QUERY.TYPE,
    description: TRAINING_PRICE_MAX_QUERY.DESCRIPTION,
    example: TRAINING_PRICE_MAX_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: TRAINING_PRICE_ORDER_QUERY.NAME,
    type: String,
    description: TRAINING_PRICE_ORDER_QUERY.DESCRIPTION,
    example: TRAINING_PRICE_ORDER_QUERY.EXAMPLE,
    enum: TRAINING_PRICE_ORDER_QUERY.ENUM,
    required: false
  })
  @ApiQuery({
    name: TRAINING_DATE_ORDER_QUERY.NAME,
    type: String,
    description: TRAINING_DATE_ORDER_QUERY.DESCRIPTION,
    example: TRAINING_DATE_ORDER_QUERY.EXAMPLE,
    enum: TRAINING_DATE_ORDER_QUERY.ENUM,
    required: false
  })
  @ApiQuery({
    name: LIMIT_QUERY.NAME,
    type: LIMIT_QUERY.TYPE,
    description: LIMIT_QUERY.DESCRIPTION,
    example: LIMIT_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: PAGE_QUERY.NAME,
    type: PAGE_QUERY.TYPE,
    description: PAGE_QUERY.DESCRIPTION,
    example: PAGE_QUERY.EXAMPLE,
    required: false
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: FOUND_RESPONSE,
    type: TrainingsWithPaginationRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_RESPONSE
  })
  @HttpCode(HttpStatus.OK)
  @Get(Route.Trainings)
  public async index(@Query() query: TrainingsQuery) {
    const trainings = await this.trainingService.getTrainings(query);

    return fillDto(
      TrainingsWithPaginationRDO,
      {
        ...trainings,
        entities: trainings.entities.map((training) => training.toObject())
      },
      {exposeDefaultValues: false}
    );
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
    type: TrainingRDO
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
  @Get(Route.Training)
  public async show(@Param('id') id: string) {
    const training = await this.trainingService.getTrainingById(id);

    return fillDto(TrainingRDO, training.toObject(), {exposeDefaultValues: false});
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
    type: TrainingRDO
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
  @Patch(Route.EditTraining)
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateTrainingDTO
  ) {
    const training = await this.trainingService.updateTraining(id, dto);

    return fillDto(TrainingRDO, training.toObject(), {exposeDefaultValues: false});
  }

  @ApiParam({
    name: ID_PARAM.NAME,
    type: String,
    description: ID_PARAM.DESCRIPTION,
    example: ID_PARAM.EXAMPLE
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
  public async delete(@Param('id') id: string) {
    this.trainingService.deleteTrainingById(id);
  }
}
