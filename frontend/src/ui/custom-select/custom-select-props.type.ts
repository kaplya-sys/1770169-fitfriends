import { RadioOption } from '../../lib/shared/types';

export type CustomSelectProps = {
  title: string;
  selectedValue: string;
  isOpen: boolean;
  isReadonly?: boolean;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  nameTransform?: Record<string, string>;
  options: RadioOption[];
  onListBoxClick: () => void;
  onListOptionClick: (option: string) => void;
}
