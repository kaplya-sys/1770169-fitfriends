import {Gender, Location, Role} from '@1770169-fitfriends/models';
export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  gender: Gender;
  birthday?: Date;
  description?: string;
  location: Location;
  role: Role;
  backgrounds: string[];
  isReady?: boolean;
  createdAt?: Date;
  questionnaireId?: string;
};
