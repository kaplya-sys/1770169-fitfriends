import {createSelector} from '@reduxjs/toolkit';

import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Friends>;

export const selectFriends = (state: State) => state[NameSpace.Friends].friends;
export const selectFriendsError = (state: State) => state[NameSpace.Friends].error;
export const selectFriendsIsLoading = (state: State) => state[NameSpace.Friends].isLoading;
export const selectMyFriends = createSelector(
  selectFriends,
  (friendsWithPagination) => {
    if (friendsWithPagination?.entities) {
      return friendsWithPagination.entities.map((entity) => entity.friend);
    }

    return [];
  }
);
