import {ExerciseType} from './exercise.type';
import {FitnessLevelType} from './fitness-level.type';
import {GenderType} from './gender.type';
import {TrainingTimeType} from './training-time.type';

export type CreateTrainingType = {
  title: string;
  level: FitnessLevelType | '';
  type: ExerciseType | '';
  trainingTime: TrainingTimeType | '';
  calories: string;
  gender: GenderType | '';
  description: string;
  price: string;
  video: File | null;
}
