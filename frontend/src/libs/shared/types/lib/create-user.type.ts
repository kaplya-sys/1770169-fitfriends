import {ExtendUser} from './extend-user.type';

export type CreateUser = Omit<ExtendUser, 'id' | 'role'>
