import {User} from "./user.interface";

export interface Feedback {
  id?: string;
  assessment: number;
  content: string;
  createdAt?: Date;
  authorId: string;
  author?: User;
  trainingId: string;
};
