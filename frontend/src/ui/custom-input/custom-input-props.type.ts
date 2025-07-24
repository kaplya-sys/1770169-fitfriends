import { ChangeEvent } from 'react';

export type CustomInputProps = {
  label?: string;
  type: string;
  name: string;
  value: string;
  isReadonly?: boolean;
  errorMessage?: string;
  className?: string;
  fieldText?: string;
  textPosition?: string;
  min?: string | number;
  max?: string | number;
  autoComplete?: string;
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}
