import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Auth>;

export const selectAuthenticatedUser = (state: State) => state[NameSpace.Auth].authenticatedUser;
export const selectAuthorizationStatus = (state: State) => state[NameSpace.Auth].authorizationStatus;
export const selectAuthenticatedUserError = (state: State) => state[NameSpace.Auth].error;
export const selectUAuthenticatedUserIsLoading = (state: State) => state[NameSpace.Auth].isLoading;
