import {SortDirection} from './sort-direction.enum';


export type Query = {
  page?: number;
  types?: string[];
  strings?: string[];
  price?: SortDirection;
  date?: SortDirection;
}

export type RequestOptionsType = {
  id?: string;
  query?: Query;
}
