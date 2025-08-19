import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Order>;

export const selectOrder = (state: State) => state[NameSpace.Order].order;
export const selectOrderError = (state: State) => state[NameSpace.Order].error;
export const selectOrderIsLoading = (state: State) => state[NameSpace.Order].isLoading;
