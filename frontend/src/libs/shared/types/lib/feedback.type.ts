import {CustomUserType} from './custom-user.type';

export type FeedbackType = {
  id: string;
  assessment: number;
  content: string;
  createdAt: Date;
  author: CustomUserType;
}
