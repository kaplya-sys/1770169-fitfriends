import {HttpException, HttpStatus} from '@nestjs/common';

import {createMessage} from '@1770169-guitar/helpers';

import {TOKEN_NOT_FOUND_ERROR} from './exceptions.constant';

export class TokenNotExistsExceptions extends HttpException {
  constructor(id: string) {
    super(createMessage(TOKEN_NOT_FOUND_ERROR, [id]), HttpStatus.UNAUTHORIZED)
  }
}
