import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnsupportedMediaTypeException
} from '@nestjs/common';

import {
  DocumentFormat,
  FieldName,
  ImageFormat,
  ParamType,
  VideoFormat
} from '@1770169-fitfriends/types';

import {FORMAT_ERROR, METADATA_CUSTOM_ERROR} from './pipes.constant';

@Injectable()
export class FilesTypeValidationPipe implements PipeTransform {
  transform(value: unknown, {type}: ArgumentMetadata) {
    if (type !== ParamType.Custom) {
      throw new Error(METADATA_CUSTOM_ERROR);
    }

    if (value !== null && typeof value === 'object') {
      const videoFormats = Object.values(VideoFormat) as string[];
      const imageFormats = Object.values(ImageFormat) as string[];
      const documentFormats = Object.values(DocumentFormat) as string[];

      Object.values(FieldName).forEach((field) => {
        if (field in value) {
          (value as Record<FieldName, Express.Multer.File[]>)[field].forEach((file) => {
            if (![...imageFormats, ...videoFormats, ...documentFormats].includes(file.mimetype)) {
              throw new UnsupportedMediaTypeException(FORMAT_ERROR);
            }
          });
        }
      });
    }

    return value;
  }

}
