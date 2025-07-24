import { ChangeEvent } from 'react';

export type CustomTextareaProps = {
  name: string;
  value: string;
  defaultValue?: string;
  className?: string;
  isReadonly?: boolean;
  errorMessage?: string;
  fieldText?: string;
  textPosition?: string;
  placeholder?: string;
  onTextareaChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
}
