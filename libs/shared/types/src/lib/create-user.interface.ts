import {Gender} from './gender.enum';
import {Location} from './location.enum';
import {Role} from './role.enum';

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  birthday?: string;
  location: Location;
  role: Role;
};
