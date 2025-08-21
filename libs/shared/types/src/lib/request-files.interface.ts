import 'multer';

export interface RequestFiles {
  file?: Express.Multer.File[];
  avatar?: Express.Multer.File[];
  video?: Express.Multer.File[];
  qualification?: Express.Multer.File[];
};
