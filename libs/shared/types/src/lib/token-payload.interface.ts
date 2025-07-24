import {Role} from './role.enum';

export interface TokenPayload {
  sub: string;
  email: string;
  role: Role;
};
