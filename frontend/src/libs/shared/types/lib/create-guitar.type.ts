import {GuitarString} from './guitar-string.enum';
import {GuitarType} from './guitar-type.enum';

export type CreateGuitar = {
  title: string;
  article: string;
  type: GuitarType;
  description: string;
  stringCount: GuitarString;
  price: string;
  image: null | File;
  date: string;
}

