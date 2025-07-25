import {Gender} from './gender.enum';
import {Location} from './location.enum';
import {Exercise} from './exercise.enum';
import {FitnessLevel} from './fitness-level.enum';

export interface UpdateUser {
  name?: string;
  exercise?: Exercise[];
  gender?: Gender;
  description?: string;
  isReady?: boolean;
  location?: Location;
  fitnessLevel?: FitnessLevel;
};
