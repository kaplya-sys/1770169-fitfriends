import {Role} from "@1770169-fitfriends/models";
import {Query} from "@1770169-fitfriends/types";

import {IsOptional, IsString} from "class-validator";

export class UsersQuery implements Query {
  @IsString()
  @IsOptional()
  public role?: Role;
}
