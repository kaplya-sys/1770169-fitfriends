import {Exercise, FitnessLevel, Gender, Location} from '@1770169-fitfriends/models';

export interface UpdateUser {
  name?: string;
  exercise?: Exercise[];
  gender?: Gender;
  description?: string;
  isReady?: boolean;
  location?: Location;
  fitnessLevel?: FitnessLevel;
};
