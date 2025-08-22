import {Exercise, FitnessLevel, TrainingTime} from '@1770169-fitfriends/models';

import {FileUpload} from './file-upload.interface';

export interface Questionnaire {
  id?: string;
  fitnessLevel: FitnessLevel;
  trainingTime?: null | TrainingTime;
  exercises: Exercise[];
  userId: string;
  caloriesLose?: null | number;
  caloriesWaste?: null | number;
  qualificationIds?: string[];
  qualifications?: FileUpload[];
  experience?: null | string;
  isPersonal?: null | boolean;
};
