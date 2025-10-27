import {ExerciseType} from './exercise.type';
import {FitnessLevelType} from './fitness-level.type';
import {GenderType} from './gender.type';
import {ImageType} from './image.type';
import {TrainingTimeType} from './training-time.type';

export type TrainingType = {
  id: string;
  title: string;
  background: ImageType;
  level: FitnessLevelType;
  type: ExerciseType;
  trainingTime: TrainingTimeType;
  calories: number;
  gender: GenderType;
  rating: number;
  description: string;
  price: number;
  video: string;
  coachName: string;
  specialOffer: boolean;
  createdAt: Date;
  coachId: string;
}
