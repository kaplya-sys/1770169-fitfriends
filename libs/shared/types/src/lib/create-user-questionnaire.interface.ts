import {Exercise, FitnessLevel, TrainingTime} from '@1770169-fitfriends/models';

export interface CreateUserQuestionnaire {
  fitnessLevel: FitnessLevel;
  trainingTime: TrainingTime;
  exercise: Exercise[];
  caloriesLose: number;
  caloriesWaste: number;
};
