import {FileInfo} from './file-info.interface';

export interface StoredFile {
  catalog: string;
  subDirectory: string;
  image?: FileInfo;
  image2x?: FileInfo;
  imageWebp?: FileInfo;
  imageWebp2x?: FileInfo;
  video?: FileInfo;
};
