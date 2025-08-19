import {ExerciseType} from './exercise.type';
import {FitnessLevelType} from './fitness-level.type';
import {GenderType} from './gender.type';
import {LocationType} from './location.type';

export type UpdateUserType = {
  name?: string;
  gender?: GenderType | '';
  location?: LocationType | '';
  exercises?: ExerciseType[];
  description?: string;
  isReady?: boolean;
  fitnessLevel?: FitnessLevelType | '';
}
