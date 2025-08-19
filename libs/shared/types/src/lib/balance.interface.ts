import {Training} from "./training.interface";

export interface Balance {
  id?: string;
  amount: number;
  userId: string;
  trainingId: string;
  training?: Training;
};
