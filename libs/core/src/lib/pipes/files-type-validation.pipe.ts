import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';

import {FieldName, ImageFormat, ParamType} from '@1770169-fitfriends/types';

import {FORMAT_ERROR, METADATA_CUSTOM_ERROR} from './pipes.constant';

@Injectable()
export class FilesTypeValidationPipe implements PipeTransform {
  transform(value: unknown, {type}: ArgumentMetadata) {
    if (type !== ParamType.Custom) {
      throw new Error(METADATA_CUSTOM_ERROR);
    }

    if (value !== null && typeof value === 'object') {
      const imageFormats = Object.values(ImageFormat) as string[];

      Object.values(FieldName).forEach((field) => {
        if (field in value) {
          (value as Record<FieldName, Express.Multer.File[]>)[field].forEach((file) => {
            if (!imageFormats.includes(file.mimetype)) {
              throw new Error(FORMAT_ERROR);
            }
          });
        }
      });
    }

    return value;
  }

}
