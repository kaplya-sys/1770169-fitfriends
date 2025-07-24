import {ExtendUser} from './extend-user.type';

export type AuthUser = Pick<ExtendUser, 'email' | 'password'>
