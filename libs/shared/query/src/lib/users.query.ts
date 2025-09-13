import {IsArray, IsEnum, IsNumber, IsOptional, Max} from 'class-validator';
import {Transform} from 'class-transformer';

import {Exercise, FitnessLevel, Location, Role} from '@1770169-fitfriends/models';
import {Query} from '@1770169-fitfriends/types';
import {DEFAULT_PAGE, MAX_ENTITY_COUNT} from './query.constant';

export class UsersQuery implements Query {
  @IsEnum(Role)
  @IsOptional()
  public role?: Role;

  @IsArray()
  @IsEnum(Exercise, {each: true})
  @IsOptional()
  public type?: Exercise[];

  @IsArray()
  @IsEnum(Location, {each: true})
  @IsOptional()
  public location?: Location[];

  @IsEnum(FitnessLevel)
  @IsOptional()
  public fitnessLevel?: FitnessLevel;

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
