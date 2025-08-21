import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common';

import {ParamType} from '@1770169-fitfriends/types';
import {isUUID} from '@1770169-fitfriends/helpers';

import {BAD_UUID_ERROR, METADATA_PARAM_ERROR} from './pipes.constant';

@Injectable()
export class UUIDValidationPipe implements PipeTransform {
  public transform(value: string, {type}: ArgumentMetadata) {
    if (type !== ParamType.Param) {
      throw new Error(METADATA_PARAM_ERROR);
    }

    if (!isUUID(value)) {
      throw new BadRequestException(BAD_UUID_ERROR);
    }

    return value;
  }
}
