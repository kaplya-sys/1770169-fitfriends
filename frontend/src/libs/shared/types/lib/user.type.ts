import {ImageType} from './image.type';
import {GenderType} from './gender.type';
import {RoleType} from './role.type';
import {MetroStationType} from './metro-station.type';
import {QuestionnaireType} from './questionnaire.type';

export type UserType = {
  id: string;
  name: string;
  email: string;
  gender: GenderType;
  station: MetroStationType;
  role: RoleType;
  backgrounds: ImageType[];
  createdAt: Date;
  questionnaire: QuestionnaireType;
  avatar?: ImageType;
  birthday?: Date;
  description?: string;
  isReady?: boolean;
}
