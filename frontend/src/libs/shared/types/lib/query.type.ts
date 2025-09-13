import {ExerciseType} from './exercise.type';
import {FitnessLevelType} from './fitness-level.type';
import {LocationType} from './location.type';
import {RoleType} from './role.type';
import {SortDirectionType} from './sort-direction.enum';
import {TrainingTimeType} from './training-time.type';

export type QueryType = {
  page?: number;
  limit?: number;
  location?: LocationType[];
  fitnessLevel?: FitnessLevelType | null;
  priceMin?: number | null;
  priceMax?: number | null;
  caloriesMin?: number | null;
  caloriesMax?: number | null;
  ratingMin?: number | null;
  ratingMax?: number | null;
  type?: ExerciseType[];
  trainingTime?: TrainingTimeType[];
  orderByDate?: SortDirectionType | null;
  orderByPrice?: SortDirectionType | null;
  orderByAmount?: SortDirectionType | null;
  orderByCount?: SortDirectionType | null;
  role?: RoleType | null;
  coach?: string;
  userId?: string;
  active?: boolean;
}
