import {Exercise, FitnessLevel, TrainingTime} from "@1770169-fitfriends/models";

export interface RecommendedFindOptions {
  calories?: number,
  level?: FitnessLevel,
  trainingTime?: TrainingTime,
  type?: Exercise[]
}
