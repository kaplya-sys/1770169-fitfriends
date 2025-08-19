import {Gender, Location, Role} from '@1770169-fitfriends/models';

import {Questionnaire} from './questionnaire.interface';
import {FileUpload} from './file-upload.interface';

export interface User {
  id?: string;
  name: string;
  email: string;
  avatarId?: null | string;
  avatar?: FileUpload;
  gender: Gender;
  birthday?: null | Date;
  description?: null | string;
  location: Location;
  role: Role;
  backgroundIds: string[];
  backgrounds?: FileUpload[];
  isReady?: boolean;
  createdAt?: Date;
  questionnaire?: null | Questionnaire;
};
