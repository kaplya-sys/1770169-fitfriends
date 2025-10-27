import {createSelector} from '@reduxjs/toolkit';

import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Users>;

export const selectUsers = (state: State) => state[NameSpace.Users].users;
export const selectUsersError = (state: State) => state[NameSpace.Users].error;
export const selectUsersIsLoading = (state: State) => state[NameSpace.Users].isLoading;
export const selectReadyUsers = createSelector(selectUsers, (users) => {
  if (users) {
    return users.entities.filter((user) => user.isReady);
  }

  return [];
});
