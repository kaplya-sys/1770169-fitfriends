import { ChangeEvent } from 'react';

import { Specialization } from '@fitfriends/lib/shared/types';

import { CheckboxOption } from '../../lib/shared/types';

export type SpecializationsGroupProps = {
  blockClassName: string;
  options: CheckboxOption[];
  selectedValue: Specialization[];
  isDisabled: boolean;
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}
