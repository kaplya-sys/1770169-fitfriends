import {ImageType} from './image.type';

export type CustomUserType = {
  id: string;
  email: string;
  name: string;
  avatar?: ImageType;
};
