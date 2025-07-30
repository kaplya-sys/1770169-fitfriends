import {Role} from '@1770169-fitfriends/models';

export interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  role: Role;
};
