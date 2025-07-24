import {User} from './user.type';

export type ExtendUser = User & {
  password: string;
}
