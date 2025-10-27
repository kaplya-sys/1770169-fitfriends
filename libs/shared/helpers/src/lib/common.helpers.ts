import {sep} from 'node:path';

import {ClassTransformOptions, plainToInstance} from 'class-transformer';
import sharp from 'sharp';

import {
  CONVERT_FILE_ERROR,
  ImageSize,
  REGEX,
  TIME_REGEX,
  UUID_REGEX,
  VALUE_PARSE_ERROR,
  WRONG_TIME_ERROR
} from './helpers.constant';
import {
  FileBuffer,
  DateTimeUnit,
  TimeAndUnit,
  Entity,
  EntityId,
  EntityConstructor
} from '@1770169-fitfriends/types';

export function fillDto<T, P>(dto: new () => T, plainObject: P, options?: ClassTransformOptions): T;

export function fillDto<T, P>(dto: new () => T, plainObject: P, options?: ClassTransformOptions): T[];

export function fillDto<T, P>(dto: new () => T, plainObject: P, options?: ClassTransformOptions): T | T[] {
  return plainToInstance(dto, plainObject, {excludeExtraneousValues: true, ...options});
};

export function createMessage<T>(message: string, expressions: T[] = []): string {
  if (!expressions.length) {
    return message.replace(REGEX, '').trim();
  }

  return expressions.reduce((accumulator: string, currentValue: T) => accumulator.replace(REGEX, String(currentValue)), message);
};

export function parseTime(time: string): TimeAndUnit {
  const match = TIME_REGEX.exec(time);

  if (!match) {
    throw new Error(createMessage(WRONG_TIME_ERROR, [time]));
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(VALUE_PARSE_ERROR);
  }

  return {value, unit}
};

export async function convertFileBuffer(buffer: Buffer): Promise<FileBuffer> {
  try {
    const image = sharp(buffer);
    const metadata = await image.metadata();
    const retinaWidth = metadata.width < ImageSize.Width ? metadata.width * 2 : ImageSize.Width * 2;
    const retinaHeight = metadata.height < ImageSize.Height ? metadata.height * 2 : ImageSize.Height * 2;

    const file = await image
      .resize(ImageSize.Width, ImageSize.Height, {
        kernel: sharp.kernel.lanczos3,
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toBuffer();

    const file2x = await image
      .resize(retinaWidth, retinaHeight, {
        kernel: sharp.kernel.lanczos3,
        fit: sharp.fit.inside,
        withoutEnlargement: false
      })
      .sharpen({sigma: 0.5})
      .toBuffer();
    const webp = await image
      .resize(ImageSize.Width, ImageSize.Height, {
          kernel: sharp.kernel.lanczos3,
          fit: sharp.fit.inside,
          withoutEnlargement: true
        })
      .toFormat('webp', {quality: 90})
      .toBuffer();

    const webp2x = await image
      .resize(retinaWidth, retinaHeight, {
        kernel: sharp.kernel.lanczos3,
        fit: sharp.fit.inside,
        withoutEnlargement: false
      })
      .sharpen({sigma: 0.5})
      .toFormat('webp', {quality: 90})
      .toBuffer();

    return {
      file,
      file2x: file2x,
      fileWebp: webp,
      fileWebp2x: webp2x
    };
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : err;
    throw new Error(createMessage(CONVERT_FILE_ERROR, [error]));
  }
}

export function normalizePath(value: string): string {
  return sep === '\\' ? value.replace(/\\/g, '/') : value;
}

export function getRandomElement<T>(elements: T[]): T {
  return elements[Math.floor(Math.random() * elements.length)];
}

export function isUUID(uuid: string): boolean {
  return UUID_REGEX.test(uuid);
}

export function isKeyOfEntity<
  P extends object,
  T extends Entity<EntityId>
  >(key: string, entity: EntityConstructor<P, T>): key is keyof T & string {
    return entity.isOwnKey(key);
}

export function parseBoolean(value: string | undefined): boolean {
  return value === 'true';
};
