import {Exercise} from './exercise.enum';
import {FitnessLevel} from './fitness-level.enum';

export interface CreateCoachQuestionnaire {
  fitnessLevel: FitnessLevel;
  exercise: Exercise[];
  experience: string;
  isPersonal: boolean;
};
