import {IsOptional, IsNumber, IsEnum} from 'class-validator';
import {Transform} from 'class-transformer';

import {Query, SortDirection} from '@1770169-fitfriends/types';

import {DEFAULT_PAGE_COUNT} from './query.constant';

export class ProductsQuery implements Query {
  @IsEnum({each: true})
  @IsOptional()
  public types?: [];

  @IsEnum({each: true})
  @IsOptional()
  public strings?: [];

  @IsEnum(SortDirection)
  @IsOptional()
  public price?: SortDirection;

  @IsEnum(SortDirection)
  @IsOptional()
  public date?: SortDirection;

  @Transform(({value}) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;
}
