import {FileInfo} from './file-info.interface';

export interface StoredFile {
  catalog: string;
  subDirectory: string;
  file: FileInfo;
  file2x: FileInfo;
};
