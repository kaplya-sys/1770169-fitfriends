import {Exercise} from './exercise.enum';
import {FitnessLevel} from './fitness-level.enum';
import {Gender} from './gender.enum';
import {TrainingTime} from './training-time.enum';

export interface CreateTraining {
  title: string;
  background: string;
  level: FitnessLevel;
  type: Exercise;
  trainingTime: TrainingTime;
  calorie: number;
  gender: Gender;
  rating: number;
  description: string;
  price: number;
  video: string;
  coachName: string;
  specialOffer: boolean;
  createdAt: Date;
  updatedAt: Date;
  coachId: string;
};
