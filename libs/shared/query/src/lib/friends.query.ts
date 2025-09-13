import {IsNumber, IsOptional, IsUUID, Max} from 'class-validator';
import {Transform} from 'class-transformer';

import {DEFAULT_PAGE, MAX_ENTITY_COUNT} from './query.constant';

export class FriendsQuery {
  @IsUUID()
  @IsOptional()
  public friendId?: string;

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
