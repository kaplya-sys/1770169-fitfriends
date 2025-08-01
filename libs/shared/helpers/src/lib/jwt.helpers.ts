import {TokenPayload, User} from '@1770169-fitfriends/types';

import {CREATE_JWT_PAYLOAD_ERROR} from './helpers.constant';

export function createJWTPayload(user: User): TokenPayload {
  if (!user.id) {
    throw new Error(CREATE_JWT_PAYLOAD_ERROR);
  }

  return {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
}
