import {Gender, Role, Station} from '@1770169-fitfriends/models';

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  birthday?: Date;
  station: Station;
  role: Role;
};
