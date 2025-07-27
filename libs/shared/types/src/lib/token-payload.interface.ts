import {Role} from '@1770169-fitfriends/models';

export interface TokenPayload {
  sub: string;
  email: string;
  role: Role;
};
