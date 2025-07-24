import {Image} from '../../types';

export const formattingNumber = (value: string | number, locale = 'ru-RU'): string => {
  if (typeof value === 'number' || !isNaN(parseInt(value, 10))) {
    const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, ''), 10) : value;

    return new Intl.NumberFormat(locale).format(num);
  }

  return '';
};

export const setDefaultFormat = (value: string): string => value.replace(/\D/g, '');

export const isImage = (value: unknown): value is Image =>
  value !== null
  && typeof value === 'object'
  && 'file' in value
  && 'file2x' in value;

export const getImagesPath = (value: unknown) =>
  isImage(value) ?
  ({
    image: value.file.path,
    image2x: value.file2x.path
  }) :
  ({
    image: '',
    image2x: ''
  })
