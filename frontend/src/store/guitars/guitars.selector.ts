import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Guitars>;

export const selectGuitars = (state: State) => state[NameSpace.Guitars].guitars;
export const selectGuitarsError = (state: State) => state[NameSpace.Guitars].error;
export const selectGuitarsIsLoading = (state: State) => state[NameSpace.Guitars].isLoading;
