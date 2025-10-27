import {UserApplicationStatusType} from './user-application-status.enum';

export type CreateUserApplicationType = {
  userId: string;
  status: UserApplicationStatusType;
}
