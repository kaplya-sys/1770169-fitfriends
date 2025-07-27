import {Gender, Location, Role} from '@1770169-fitfriends/models';

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  birthday?: Date;
  location: Location;
  role: Role;
};
