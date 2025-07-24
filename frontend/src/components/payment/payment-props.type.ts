import { ChangeEvent } from 'react';

import { PaymentMethod } from '@fitfriends/lib/shared/types';

export type PaymentPropsType = {
  selectedValue: PaymentMethod | string;
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}
