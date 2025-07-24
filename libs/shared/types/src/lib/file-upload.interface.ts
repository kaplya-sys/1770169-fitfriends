import {FileInfo} from './file-info.interface';
import {Timestamps} from './timestamps.interface';

export interface FileUpload extends Timestamps {
  id?: string;
  originalName: string;
  subDirectory: string;
  catalog: string;
  size: number;
  mimetype: string;
  file: FileInfo,
  file2x?: FileInfo,
};
