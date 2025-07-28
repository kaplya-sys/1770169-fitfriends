import {Exercise, FitnessLevel, Gender, TrainingTime} from '@1770169-fitfriends/models';

export interface Training {
  id?: string;
  title: string;
  background: string;
  level: FitnessLevel;
  type: Exercise;
  trainingTime: TrainingTime;
  calorie: number;
  gender: Gender;
  rating: number;
  description: string;
  price: number;
  video: string;
  coachName: string;
  specialOffer: boolean;
  createdAt: Date;
  coachId: string;
};
