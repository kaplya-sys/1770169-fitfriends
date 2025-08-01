import {Exercise, FitnessLevel, Gender, TrainingTime} from '@1770169-fitfriends/models';

export interface CreateTraining {
  title: string;
  level: FitnessLevel;
  type: Exercise;
  trainingTime: TrainingTime;
  calories: number;
  gender: Gender;
  description: string;
  price: number;
};
