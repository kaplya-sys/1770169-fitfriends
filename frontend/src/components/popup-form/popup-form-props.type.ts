import { FormEvent, PropsWithChildren } from 'react';

export type PopupFormProps = PropsWithChildren<{
  blockClassName: string;
  title?: string;
  agreementISChecked?: boolean;
  onFormSubmit: (evt: FormEvent<HTMLFormElement>) => void;
}>
