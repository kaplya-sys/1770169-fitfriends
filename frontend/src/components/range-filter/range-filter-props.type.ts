import { Range } from '@fitfriends/lib/shared/types';

export type RangeFilterPropsType = {
  blockClassName: string;
  title: string;
  priceRange: Range;
  onFilterChange?: (range: Range) => void;
}
