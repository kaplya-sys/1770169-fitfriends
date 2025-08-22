import {RoleType} from './role.type';
import {TokenType} from './token.type';

export type AuthenticatedUserType = TokenType & {
  id: string;
  email: string;
  name: string;
  role: RoleType;
}
