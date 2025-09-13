import {IsEnum, IsNumber, IsOptional, IsUUID, Max} from 'class-validator';
import {Transform} from 'class-transformer';

import {SortDirection} from '@1770169-fitfriends/types';
import {DEFAULT_PAGE, MAX_ENTITY_COUNT} from './query.constant';

export class OrdersQuery {
  @IsUUID()
  @IsOptional()
  public userId?: string;

  @IsEnum(SortDirection)
  @IsOptional()
  public orderByAmount?: SortDirection;

  @IsEnum(SortDirection)
  @IsOptional()
  public orderByCount?: SortDirection;

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
