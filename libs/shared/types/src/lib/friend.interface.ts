import {User} from './user.interface';

export interface Friend {
  id?: string;
  userId: string;
  user?: User;
  friendId: string;
  friend?: User;
  isJoinTraining?: null | boolean;
  isPersonalTraining?: null | boolean;
}
