import {UserApplicationStatus} from '@1770169-fitfriends/models';

export interface CreateUserApplication {
  userId: string;
  status: UserApplicationStatus;
}
