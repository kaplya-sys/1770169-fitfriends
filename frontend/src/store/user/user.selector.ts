import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.User>;

export const selectUser = (state: State) => state[NameSpace.User].user;
export const selectAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const selectUserError = (state: State) => state[NameSpace.User].error;
export const selectUserIsLoading = (state: State) => state[NameSpace.User].isLoading;
