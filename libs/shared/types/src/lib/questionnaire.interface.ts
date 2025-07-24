import {FitnessLevel} from './fitness-level.enum';
import {TrainingTime} from './training-time.enum';

export interface Questionnaire {
  id: string;
  fitnessLevel: FitnessLevel;
  trainingTime: TrainingTime;
  calorieLose: number;
  calorieWaste: number;
  isReady: boolean;
};
