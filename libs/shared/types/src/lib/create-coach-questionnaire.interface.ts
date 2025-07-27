import {Exercise, FitnessLevel} from '@1770169-fitfriends/models';

export interface CreateCoachQuestionnaire {
  fitnessLevel: FitnessLevel;
  exercise: Exercise[];
  experience: string;
  isPersonal: boolean;
};
