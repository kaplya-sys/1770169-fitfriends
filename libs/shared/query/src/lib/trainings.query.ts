import {IsOptional, IsNumber, IsEnum, Max} from 'class-validator';
import {Transform} from 'class-transformer';

import {Query, SortDirection} from '@1770169-fitfriends/types';

import {DEFAULT_ENTITY_COUNT, DEFAULT_PAGE_COUNT} from './query.constant';

export class TrainingsQuery implements Query {
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
  public rating?: number;

  @IsEnum(SortDirection)
  @IsOptional()
  public orderByDate?: SortDirection;

  @IsEnum(SortDirection)
  @IsOptional()
  public orderByPrice?: SortDirection;

  @Transform(({value}) => parseInt(value, 10) || DEFAULT_ENTITY_COUNT)
  @IsNumber()
  @Max(DEFAULT_ENTITY_COUNT)
  @IsOptional()
  public limit?: number = DEFAULT_ENTITY_COUNT;

  @Transform(({value}) => parseInt(value, 10) || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;
}
