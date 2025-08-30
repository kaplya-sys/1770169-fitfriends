import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.RangeFilters>;

export const selectRangeFilters = (state: State) => state[NameSpace.RangeFilters].rangeFilters;
export const selectRangeFiltersError = (state: State) => state[NameSpace.RangeFilters].error;
export const selectRangeFiltersIsLoading = (state: State) => state[NameSpace.RangeFilters].isLoading;
