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
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import {FileFieldsInterceptor} from '@nestjs/platform-express';

import {FilesTypeValidationPipe, ParseFormDataJsonPipe, UUIDValidationPipe} from '@1770169-fitfriends/core';
import {
  CreateFeedbackDto,
  CreateTrainingDTO,
  CreateTrainingSwaggerDTO,
  UpdateTrainingDTO
} from '@1770169-fitfriends/dto';
import {fillDto} from '@1770169-fitfriends/helpers';
import {
  FeedbackRDO,
  RangeFiltersRDO,
  TrainingRDO,
  TrainingsWithPaginationRDO
} from '@1770169-fitfriends/rdo';
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
  UNAUTHORIZED,
  INTERNAL_SERVER_RESPONSE,
  DATA_TYPE,
  TRAINING_RATING_MAX_QUERY,
  TRAINING_RATING_MIN_QUERY,
  TRAINING_TYPE_QUERY
} from './training.constant';
import {JWTAuthGuard} from '../guards/jwt-auth.guard';
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
  @ApiConsumes(DATA_TYPE)
  @ApiBody({
    type: CreateTrainingSwaggerDTO
  })
  @UseInterceptors(FileFieldsInterceptor([
    {name: FieldName.Video, maxCount: MAX_UPLOAD_FILES}
  ]))
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.Create)
  public async create(
    @UploadedFiles(FilesTypeValidationPipe) files: RequestFiles,
    @Body(ParseFormDataJsonPipe) dto: CreateTrainingDTO,
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const newTraining = await this.trainingService.createTraining(tokenPayload, dto, files);

    return fillDto(TrainingRDO, newTraining.toObject(), {exposeDefaultValues: false});
  }

  @ApiQuery({
    name: TRAINING_TYPE_QUERY.NAME,
    description: TRAINING_TYPE_QUERY.DESCRIPTION,
    enum: TRAINING_TYPE_QUERY.ENUM,
    example: TRAINING_TYPE_QUERY.EXAMPLE,
    isArray: true,
    required: false
  })
  @ApiQuery({
    name: TRAINING_RATING_MAX_QUERY.NAME,
    type: Number,
    description: TRAINING_RATING_MAX_QUERY.DESCRIPTION,
    example: TRAINING_RATING_MAX_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: TRAINING_RATING_MIN_QUERY.NAME,
    type: Number,
    description: TRAINING_RATING_MIN_QUERY.DESCRIPTION,
    example: TRAINING_RATING_MIN_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: TRAINING_CALORIES_MAX_QUERY.NAME,
    type: Number,
    description: TRAINING_CALORIES_MAX_QUERY.DESCRIPTION,
    example: TRAINING_CALORIES_MAX_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: TRAINING_CALORIES_MIN_QUERY.NAME,
    type: Number,
    description: TRAINING_CALORIES_MIN_QUERY.DESCRIPTION,
    example: TRAINING_CALORIES_MIN_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: TRAINING_PRICE_MIN_QUERY.NAME,
    type: Number,
    description: TRAINING_PRICE_MIN_QUERY.DESCRIPTION,
    example: TRAINING_PRICE_MIN_QUERY.EXAMPLE,
    required: false
  })
  @ApiQuery({
    name: TRAINING_PRICE_MAX_QUERY.NAME,
    type: Number,
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
    type: TrainingsWithPaginationRDO
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
    @Query() query: TrainingsQuery
  ) {
    const trainings = await this.trainingService.getTrainings(query);

    return fillDto(TrainingsWithPaginationRDO, {
      ...trainings,
      entities: trainings.entities.map((training) => training.toObject())
    }, {exposeDefaultValues: false});
  }

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
  @Get(Route.Recommended)
  public async getRecommended(
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const recommendedTrainings = await this.trainingService.getRecommendedTrainings(tokenPayload.sub);

    return recommendedTrainings.map((recommendedTraining) => fillDto(TrainingRDO, recommendedTraining.toObject(), {exposeDefaultValues: false}));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FOUND_RESPONSE,
    type: RangeFiltersRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.Range)
  public async getRange() {
    const range = await this.trainingService.getPriceAndCaloriesRange();

    return fillDto(RangeFiltersRDO, range, {exposeDefaultValues: false});
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
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: INTERNAL_SERVER_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseInterceptors(FileFieldsInterceptor([
    {name: FieldName.Video, maxCount: MAX_UPLOAD_FILES}
  ]))
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(Route.EditTraining)
  public async update(
    @UploadedFiles(FilesTypeValidationPipe) files: RequestFiles,
    @Param('id', UUIDValidationPipe) id: string,
    @Body() dto: UpdateTrainingDTO
  ) {
    const training = await this.trainingService.updateTraining(id, dto, files);

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
  public async delete(
    @Param('id', UUIDValidationPipe) id: string
  ) {
    await this.trainingService.deleteTrainingById(id);
  }

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
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: INTERNAL_SERVER_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED
  })
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.CreateTrainingFeedback)
  public async createFeedback(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() dto: CreateFeedbackDto,
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const newFeedback = await this.trainingService.createFeedback(id, tokenPayload, dto);

    return fillDto(FeedbackRDO, newFeedback.toObject(), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FOUND_RESPONSE,
    type: FeedbackRDO
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
  @Get(Route.Feedbacks)
  public async getFeedbacks(
    @Param('id', UUIDValidationPipe) id: string
  ) {
    const feedbacks = await this.trainingService.getFeedbacksByTrainingId(id);

    return feedbacks.map((feedback) => fillDto(FeedbackRDO, feedback.toObject(), {exposeDefaultValues: false}));
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
  public async show(
    @Param('id', UUIDValidationPipe) id: string
  ) {
    const training = await this.trainingService.getTrainingById(id);

    return fillDto(TrainingRDO, training.toObject(), {exposeDefaultValues: false});
  }
}
