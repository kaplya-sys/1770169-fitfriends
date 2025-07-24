import {SortDirection} from './sort-direction.enum';

export interface Query {
  page?: number;
  types?: [];
  strings?: [];
  price?: SortDirection;
  date?: SortDirection;
};
