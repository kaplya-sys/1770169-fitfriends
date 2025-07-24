import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Guitar>;

export const selectGuitar = (state: State) => state[NameSpace.Guitar].guitar;
export const selectGuitarError = (state: State) => state[NameSpace.Guitar].error;
export const selectGuitarIsLoading = (state: State) => state[NameSpace.Guitar].isLoading;
