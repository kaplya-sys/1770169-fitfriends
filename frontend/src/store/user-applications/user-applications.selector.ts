import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.UserApplications>;

export const selectUserApplications = (state: State) => state[NameSpace.UserApplications].userApplications;
export const selectUserApplicationsError = (state: State) => state[NameSpace.UserApplications].error;
export const selectUserApplicationsIsLoading = (state: State) => state[NameSpace.UserApplications].isLoading;
