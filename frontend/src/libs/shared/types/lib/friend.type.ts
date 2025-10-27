import {UserType} from './user.type';

export type FriendType = {
  id: string;
  user: UserType;
  friend: UserType;
}
