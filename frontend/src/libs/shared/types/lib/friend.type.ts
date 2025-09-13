import {UserType} from './user.type';

export type FriendType = {
  id: string;
  userId: string;
  friend: UserType;
  isJoinTraining?: boolean;
  isPersonalTraining?: boolean;
}
