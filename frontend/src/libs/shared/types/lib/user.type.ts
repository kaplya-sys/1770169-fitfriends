import {ImageType} from './image.type';
import {GenderType} from './gender.type';
import {RoleType} from './role.type';
import {LocationType} from './location.type';
import {QuestionnaireType} from './questionnaire.type';

export type UserType = {
  id: string;
  name: string;
  email: string;
  gender: GenderType;
  location: LocationType;
  role: RoleType;
  backgrounds: ImageType[];
  createdAt: Date;
  questionnaire: QuestionnaireType;
  avatar?: ImageType;
  birthday?: Date;
  description?: string;
  isReady?: boolean;
}
