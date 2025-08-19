import {Exercise, FitnessLevel, TrainingTime} from '@1770169-fitfriends/models';

export interface Questionnaire {
  id?: string;
  fitnessLevel: FitnessLevel;
  trainingTime?: null | TrainingTime;
  exercises: Exercise[];
  userId: string;
  caloriesLose?: null | number;
  caloriesWaste?: null | number;
  qualifications?: string[];
  experience?: null | string;
  isPersonal?: null | boolean;
};
