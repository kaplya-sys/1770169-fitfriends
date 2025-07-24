import { ChangeEvent } from 'react';

export type RoleSelectionProps = {
  blockClassName: string;
  value: string;
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}
