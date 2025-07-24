import {GuitarString} from './guitar-string.enum';
import {GuitarType} from './guitar-type.enum';

export type Filter = {
  types: GuitarType[] | string[];
  strings: GuitarString[] | string[];
}
