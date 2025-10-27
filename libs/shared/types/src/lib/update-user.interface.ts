import {Exercise, FitnessLevel, Gender, Station} from '@1770169-fitfriends/models';

export interface UpdateUser {
  name?: string;
  exercises?: Exercise[];
  gender?: Gender;
  description?: string;
  isReady?: boolean;
  station?: Station;
  fitnessLevel?: FitnessLevel;
};
