import { ChangeEvent } from 'react';

import { RadioOption } from '../../lib/shared/types';

export type CustomRadioGroupProps = {
  options: RadioOption[];
  selectedValue: string;
  isBig?: boolean;
  className?: string;
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}
