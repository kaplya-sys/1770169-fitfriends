import {Exercise} from './exercise.enum';
import {FitnessLevel} from './fitness-level.enum';
import {TrainingTime} from './training-time.enum';

export interface Questionnaire {
  id: string;
  fitnessLevel: FitnessLevel;
  trainingTime: TrainingTime;
  exercise: Exercise[];
  calorieLose: number;
  calorieWaste: number;
};
