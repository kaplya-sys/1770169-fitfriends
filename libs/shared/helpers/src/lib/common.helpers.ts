import {sep} from 'node:path';

import {ClassTransformOptions, plainToInstance} from 'class-transformer';
import sharp from 'sharp';

import {
  CONVERT_FILE_ERROR,
  REGEX,
  TIME_REGEX,
  VALUE_PARSE_ERROR,
  WRONG_TIME_ERROR
} from './helpers.constant';
import {BufferVariant, DateTimeUnit, MongooseConfig, TimeAndUnit} from '@1770169-fitfriends/types';

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

export function getMongoConnectionString({host, port, name, username, userPassword, authSource}: MongooseConfig): string {
  return `mongodb://${username}:${userPassword}@${host}:${port}/${name}?authSource=${authSource}`;
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

export async function convertFileBuffer(file: Buffer): Promise<BufferVariant> {
  try {
    const image = sharp(file);
    const metadata = await image.metadata();
    const newWidth = metadata.width * 2;
    const newHeight = metadata.height * 2;

    const file2x = await image
      .resize(newWidth, newHeight, {
        kernel: 'mitchell',
        fit: 'inside'
      })
      .toBuffer();
    const webp = await image
      .toFormat('webp', { quality: 100 })
      .toBuffer();

    const webp2x = await image
      .resize(newWidth, newHeight, {
        kernel: 'mitchell',
        fit: 'inside'
      })
      .toFormat('webp', { quality: 100 })
      .toBuffer();

    return {
      image: file,
      image2x: file2x,
      imageWeb: webp,
      imageWeb2x: webp2x
    };
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : err;
    throw new Error(createMessage(CONVERT_FILE_ERROR, [error]));
  }
}

export const normalizePath = (value: string): string =>  sep === '\\' ? value.replace(/\\/g, '/') : value;

export const getRandomElement = <T>(elements: T[]): T => elements[Math.floor(Math.random() * elements.length)];

