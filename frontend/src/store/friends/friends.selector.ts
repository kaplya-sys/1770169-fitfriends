import {createSelector} from '@reduxjs/toolkit';

import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';
import {selectAuthenticatedUser} from '../auth/auth.selector';

type State = Pick<Store, NameSpace.Friends>;

export const selectFriends = (state: State) => state[NameSpace.Friends].friends;
export const selectFriendsError = (state: State) => state[NameSpace.Friends].error;
export const selectFriendsIsLoading = (state: State) => state[NameSpace.Friends].isLoading;
export const selectMyFriends = createSelector(
  selectFriends, selectAuthenticatedUser,
  (friendsWithPagination, authenticatedUser) => {
    if (friendsWithPagination?.entities && authenticatedUser) {
      return friendsWithPagination.entities.map((entity) => authenticatedUser.id !== entity.friend.id ? entity.friend : entity.user);
    }

    return [];
  }
);
