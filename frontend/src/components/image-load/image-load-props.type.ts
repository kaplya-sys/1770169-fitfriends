import { ChangeEvent } from 'react';

export type ImageLoadProps = {
  blockClassName: string;
  onFileChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}
