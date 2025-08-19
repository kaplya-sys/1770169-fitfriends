import {GenderType} from './gender.type';
import {LocationType} from './location.type';
import {RoleType} from './role.type';

export type CreateUserType = {
  name: string;
  email: string;
  password: string;
  gender: GenderType | '';
  location: LocationType | '';
  role: RoleType | '';
  avatar?: File;
  birthday?: string;
}
