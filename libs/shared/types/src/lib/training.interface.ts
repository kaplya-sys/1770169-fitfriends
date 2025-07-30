import {Exercise, FitnessLevel, Gender, TrainingTime} from '@1770169-fitfriends/models';

export interface Training {
  id?: string;
  title: string;
  backgroundId: string;
  level: FitnessLevel;
  type: Exercise;
  trainingTime: TrainingTime;
  calories: number;
  gender: Gender;
  rating?: number;
  description: string;
  price: number;
  videoId: string;
  coachName: string;
  specialOffer: boolean;
  createdAt?: Date;
  coachId: string;
};
