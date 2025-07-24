import { PropsWithChildren } from 'react';

export type PopupPropsType = PropsWithChildren<{
  isActive: boolean;
  blockClassName: string;
  title: string;
  onCloseClick: () => void;
}>
