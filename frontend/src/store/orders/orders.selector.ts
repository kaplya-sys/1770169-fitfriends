import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Orders>;

export const selectOrders = (state: State) => state[NameSpace.Orders].orders;
export const selectOrdersError = (state: State) => state[NameSpace.Orders].error;
export const selectOrdersIsLoading = (state: State) => state[NameSpace.Orders].isLoading;
