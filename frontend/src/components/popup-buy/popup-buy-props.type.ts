import { TrainingType } from '../../lib/shared/types';

export type PopupBuyPropsType = {
  product: TrainingType;
  isActive: boolean;
  onToggleClick: () => void;
}
