import {Gender} from './gender.enum';
import {Location} from './location.enum';
import {Role} from './role.enum';

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  gender: Gender;
  birthday: Date;
  description: string;
  location: Location;
  role: Role;
  background: string;
  createdAt: Date;
  updatedAt: Date;
  questionnaireId: string;
};
