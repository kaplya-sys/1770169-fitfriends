import {Exercise, FitnessLevel, TrainingTime} from '@1770169-fitfriends/models';

export interface Questionnaire {
  id?: string;
  fitnessLevel: FitnessLevel;
  trainingTime?: TrainingTime;
  exercise: Exercise[];
  calorieLose?: number;
  calorieWaste?: number;
  qualifications?: string[];
  experience?: string;
  isPersonal?: boolean;
};
