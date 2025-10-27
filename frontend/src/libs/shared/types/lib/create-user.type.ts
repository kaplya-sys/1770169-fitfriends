import {GenderType} from './gender.type';
import {StationType} from './station.type';
import {RoleType} from './role.type';

export type CreateUserType = {
  name: string;
  email: string;
  password: string;
  gender: GenderType | '';
  station: StationType | '';
  role: RoleType | '';
  avatar?: File;
  birthday?: string;
}
