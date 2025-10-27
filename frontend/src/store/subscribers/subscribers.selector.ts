import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Subscribers>;

export const selectSubscribers = (state: State) => state[NameSpace.Subscribers].subscribers;
export const selectSubscribersError = (state: State) => state[NameSpace.Subscribers].error;
export const selectSubscribersIsLoading = (state: State) => state[NameSpace.Subscribers].isLoading;
