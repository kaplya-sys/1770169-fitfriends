import { QualificationType } from './qualification.type';
import {ExerciseType} from './exercise.type';
import {FitnessLevelType} from './fitness-level.type';
import {TrainingTimeType} from './training-time.type';

export type QuestionnaireType = {
  id: string;
  exercises: ExerciseType[];
  fitnessLevel: FitnessLevelType;
  trainingTime?: TrainingTimeType;
  caloriesLose?: number;
  caloriesWaste?: number;
  qualifications?: QualificationType[];
  experience?: string;
  isPersonal?: boolean;
}
