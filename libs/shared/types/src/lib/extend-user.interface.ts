import {User} from './user.interface';

export interface ExtendUser extends User {
  password: string;
};
