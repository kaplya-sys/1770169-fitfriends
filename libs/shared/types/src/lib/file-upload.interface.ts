import {FileInfo} from './file-info.interface';
import {Timestamps} from './timestamps.interface';

export interface FileUpload extends Timestamps {
  id?: string;
  originalName: string;
  subDirectory: string;
  catalog: string;
  size: number;
  mimetype: string;
  image?: FileInfo;
  image2x?: FileInfo;
  imageWeb?: FileInfo;
  imageWeb2x?: FileInfo;
  video?: FileInfo;
};
