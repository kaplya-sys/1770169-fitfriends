import {UserApplicationStatusType} from './user-application-status.enum';

export type UserApplicationType = {
  id: string;
  initiatorId: string;
  userId: string;
  status: UserApplicationStatusType;
  createdAt: Date;
  updatedAt: Date;
}
