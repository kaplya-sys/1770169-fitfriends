import {GuitarString} from './guitar-string.enum';
import {GuitarType} from './guitar-type.enum';

export type Guitar = {
  id: string;
  title: string;
  article: string;
  type: GuitarType;
  description: string;
  stringCount: GuitarString;
  price: number;
  image: string;
  date: string;
}
