import {UserApplicationStatus} from '@1770169-fitfriends/models';

import {User} from './user.interface';

export interface UserApplication {
  id?: string;
  initiatorId: string;
  userId: string;
  user?: User;
  status: UserApplicationStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
