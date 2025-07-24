import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common';

import {ParamType} from '@1770169-fitfriends/types';
import {createMessage} from '@1770169-fitfriends/helpers';

import {METADATA_BODY_ERROR, PARSE_DATA_ERROR} from './pipes.constant';

@Injectable()
export class ParseFormDataJsonPipe implements PipeTransform {
  transform(value: unknown, {type}: ArgumentMetadata) {
    if (type !== ParamType.Body) {
      throw new Error(METADATA_BODY_ERROR);
    }

    if (value !== null && typeof value === 'object' && 'data' in value && value.data === 'string') {
      try {
        const parsedData = JSON.parse(value.data);
        delete value.data;

        return {...value, ...parsedData};
      } catch (err) {
        const error = err instanceof Error ? err.message : err;
        throw new BadRequestException(createMessage(PARSE_DATA_ERROR, [error]));
      }
    }

    return value;
  }
}
