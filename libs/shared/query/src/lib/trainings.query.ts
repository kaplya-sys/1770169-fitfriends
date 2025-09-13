import {
  IsOptional,
  IsNumber,
  IsEnum,
  Max,
  IsArray,
  IsString
} from 'class-validator';
import {Transform} from 'class-transformer';

import {Query, SortDirection} from '@1770169-fitfriends/types';

import {MAX_ENTITY_COUNT, DEFAULT_PAGE} from './query.constant';
import {Exercise, TrainingTime} from '@1770169-fitfriends/models';

export class TrainingsQuery implements Query {
  @IsString()
  @IsOptional()
  public coach?: string;

  @Transform(({value}) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  public caloriesMin?: number;

  @Transform(({value}) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  public caloriesMax?: number;

  @Transform(({value}) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  public priceMin?: number;

  @Transform(({value}) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  public priceMax?: number;

  @Transform(({value}) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  public ratingMin?: number;

  @Transform(({value}) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  public ratingMax?: number;

  @IsArray()
  @IsEnum(Exercise, {each: true})
  @IsOptional()
  public type?: Exercise[];

  @IsArray()
  @IsEnum(TrainingTime, {each: true})
  @IsOptional()
  public trainingTime?: TrainingTime[];

  @IsEnum(SortDirection)
  @IsOptional()
  public orderByDate?: SortDirection;

  @IsEnum(SortDirection)
  @IsOptional()
  public orderByPrice?: SortDirection;

  @Transform(({value}) => parseInt(value, 10))
  @IsNumber()
  @Max(MAX_ENTITY_COUNT)
  @IsOptional()
  public limit?: number;

  @Transform(({value}) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE;
}
