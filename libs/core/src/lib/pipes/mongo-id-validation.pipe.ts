import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common';
import {Types} from 'mongoose';

import {ParamType} from '@1770169-fitfriends/types';

import {BAD_MONGO_ID_ERROR, METADATA_PARAM_ERROR} from './pipes.constant';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, {type}: ArgumentMetadata) {
    if (type !== ParamType.Param) {
      throw new Error(METADATA_PARAM_ERROR);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGO_ID_ERROR);
    }

    return value;
  }
}
