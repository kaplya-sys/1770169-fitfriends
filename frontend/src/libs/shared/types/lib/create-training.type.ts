import {ExerciseType} from './exercise.type';
import {FitnessLevelType} from './fitness-level.type';
import {GenderType} from './gender.type';
import {TrainingTimeType} from './training-time.type';

export type CreateTrainingType = {
  title: string;
  fitnessLevel: FitnessLevelType | '';
  type: ExerciseType | '';
  trainingTime: TrainingTimeType | '';
  caloriesWaste: string;
  gender: GenderType | '';
  trainingDescription: string;
  price: string;
  video: File | null;
}
