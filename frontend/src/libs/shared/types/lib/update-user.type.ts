import {ExerciseType} from './exercise.type';
import {FitnessLevelType} from './fitness-level.type';
import {GenderType} from './gender.type';
import {StationType} from './station.type';

export type UpdateUserType = {
  avatar?: null | File;
  name?: string;
  gender?: GenderType | '';
  station?: StationType | '';
  exercises?: ExerciseType[];
  userDescription?: string;
  isReady?: boolean;
  fitnessLevel?: FitnessLevelType | '';
}
