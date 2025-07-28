export interface Feedback {
  id?: string;
  assessment: number;
  content: string;
  createdAt: Date;
  authorId: string;
  trainingId: string;
};
