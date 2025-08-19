import {CreateUserType} from './create-user.type';

export type AuthUserType = Pick<CreateUserType, 'email' | 'password'>
