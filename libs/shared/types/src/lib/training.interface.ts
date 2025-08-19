import {Exercise, FitnessLevel, Gender, TrainingTime} from '@1770169-fitfriends/models';

import {FileUpload} from './file-upload.interface';

export interface Training {
  id?: string;
  title: string;
  backgroundId: string;
  background?: FileUpload;
  level: FitnessLevel;
  type: Exercise;
  trainingTime: TrainingTime;
  calories: number;
  gender: Gender;
  rating?: number;
  description: string;
  price: number;
  videoId: string;
  video?: FileUpload;
  coachName: string;
  specialOffer: boolean;
  createdAt?: Date;
  coachId: string;
};
