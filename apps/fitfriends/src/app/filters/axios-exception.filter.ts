import {AxiosError} from 'axios';
import {Response} from 'express';
import {ArgumentsHost, Catch, HttpStatus} from '@nestjs/common';
import {BaseExceptionFilter} from '@nestjs/core';

import {ErrorRequest} from '@1770169-guitar/types';

import {SERVER_ERROR_MESSAGE} from './filters.constant';

@Catch()
export class AxiosExceptionFilter extends BaseExceptionFilter {
  override catch(exception: AxiosError<ErrorRequest>, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.response?.data.message;
    const status = exception.response?.data.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const error = exception.response?.data.error || SERVER_ERROR_MESSAGE;
    response.status(status).json(
      {
        statusCode: status,
        message,
        error
      }
    );
  }
}
