import 'multer';
import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';

import {FieldName, ParamType} from '@1770169-fitfriends/types';

import {MAX_SIZE, METADATA_CUSTOM_ERROR, SIZE_ERROR} from './pipes.constant';

@Injectable()
export class ImageSizeValidationPipe implements PipeTransform {
  transform(file: Record<FieldName, Express.Multer.File[]>, {type}: ArgumentMetadata) {
    if (type !== ParamType.Custom) {
      throw new Error(METADATA_CUSTOM_ERROR)
    }

    Object.values(file).forEach(([value]) => {
      if (value.fieldname === FieldName.Avatar && value.size > MAX_SIZE) {
        throw new Error(SIZE_ERROR)
      }
    })

    return file;
  }
}
