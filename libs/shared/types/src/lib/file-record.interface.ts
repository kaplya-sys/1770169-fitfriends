import { FileUpload } from './file-upload.interface';

export interface FileRecord {
  avatar?: FileUpload;
  background?: FileUpload;
  backgrounds?: FileUpload[];
  video?: FileUpload;
  qualifications?: FileUpload[];
}
