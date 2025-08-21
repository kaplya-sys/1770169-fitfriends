import {RoleType} from './role.type';
import {TokenType} from './token.type';

export type AuthenticatedUserType = TokenType & {
  sub: string;
  email: string;
  name: string;
  role: RoleType;
}
