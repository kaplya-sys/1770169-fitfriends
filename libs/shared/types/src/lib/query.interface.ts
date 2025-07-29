import {SortDirection} from './sort-direction.enum';

export interface Query {
  page?: number;
  limit?: number;
  caloriesMin?: number;
  caloriesMax?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  orderByDate?: SortDirection;
  orderByPrice?: SortDirection;
};
