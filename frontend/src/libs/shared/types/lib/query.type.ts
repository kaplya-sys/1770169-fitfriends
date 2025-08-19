import {ExerciseType} from './exercise.type';
import {RoleType} from './role.type';
import {SortDirectionType} from './sort-direction.enum';

export type QueryType = {
  page?: number;
  limit?: number;
  priceMin?: number | null;
  priceMax?: number | null;
  caloriesMin?: number | null;
  caloriesMax?: number | null;
  ratingMin?: number | null;
  ratingMax?: number | null;
  type?: ExerciseType[];
  orderByDate?: SortDirectionType | null;
  orderByPrice?: SortDirectionType | null;
  role?: RoleType | null;
}
