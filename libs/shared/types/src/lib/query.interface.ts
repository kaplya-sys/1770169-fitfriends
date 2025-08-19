import {Exercise, Role} from '@1770169-fitfriends/models';

import {SortDirection} from './sort-direction.enum';

export interface Query {
  page?: number;
  limit?: number;
  caloriesMin?: number;
  caloriesMax?: number;
  priceMin?: number;
  priceMax?: number;
  ratingMin?: number;
  ratingMax?: number;
  type?: Exercise[];
  orderByDate?: SortDirection;
  orderByPrice?: SortDirection;
  role?: Role;
};
