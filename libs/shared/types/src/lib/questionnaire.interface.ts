import {Exercise, FitnessLevel, TrainingTime} from '@1770169-fitfriends/models';

export interface Questionnaire {
  id?: string;
  fitnessLevel: FitnessLevel;
  trainingTime?: TrainingTime;
  exercise: Exercise[];
  caloriesLose?: number;
  caloriesWaste?: number;
  qualifications?: string[];
  experience?: string;
  isPersonal?: boolean;
};
