import {FileInfo} from './file-info.interface';

export interface StoredFile {
  catalog: string;
  subDirectory: string;
  image?: FileInfo;
  image2x?: FileInfo;
  imageWeb?: FileInfo;
  imageWeb2x?: FileInfo;
  video?: FileInfo;
};
