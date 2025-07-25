import {Exercise} from './exercise.enum';
import {FitnessLevel} from './fitness-level.enum';
import {Gender} from './gender.enum';
import {TrainingTime} from './training-time.enum';

export interface CreateTraining {
  title: string;
  level: FitnessLevel;
  type: Exercise;
  trainingTime: TrainingTime;
  calorie: number;
  gender: Gender;
  description: string;
  price: number;
};
