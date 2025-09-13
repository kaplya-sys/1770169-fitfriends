import {createSelector} from '@reduxjs/toolkit';

import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.User>;

export const selectUser = (state: State) => state[NameSpace.User].user;
export const selectUserError = (state: State) => state[NameSpace.User].error;
export const selectUserIsLoading = (state: State) => state[NameSpace.User].isLoading;
export const selectUserBackgrounds = createSelector(
  selectUser,
  (user) => {
    if (user) {
      return user.backgrounds.map((background) => ({...background, id: crypto.randomUUID()}));
    }

    return [];
  }
);
