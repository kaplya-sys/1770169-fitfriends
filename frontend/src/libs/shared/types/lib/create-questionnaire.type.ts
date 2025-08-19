import {ExerciseType} from './exercise.type';
import {FitnessLevelType} from './fitness-level.type';
import {TrainingTimeType} from './training-time.type';

export type CreateQuestionnaireType = {
  exercises: ExerciseType[];
  fitnessLevel: FitnessLevelType | '';
  trainingTime: TrainingTimeType | '';
  caloriesLose: string;
  caloriesWaste: string;
  qualifications: FileList | null;
  experience: string;
  isPersonal: boolean;
}
