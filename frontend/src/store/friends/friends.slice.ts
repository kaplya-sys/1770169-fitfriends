import {createSlice} from '@reduxjs/toolkit';

import {ErrorRequestType, FriendType, NameSpace, PaginatedResponseType} from '../../libs/shared/types';
import {getFriendsByUserAction} from '../api-actions/friend.api-actions';

type InitialState = {
  friends: PaginatedResponseType<FriendType> | null;
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  friends: null,
  error: null,
  isLoading: false
};

export const friendsSlice = createSlice({
  name: NameSpace.Friends,
  initialState,
  reducers: {
    deleteUserFriend: (state, {payload}) => {
      if (state.friends) {
        state.friends = {...state.friends, entities: state.friends.entities.filter((entity) => entity.id !== payload)};
      }
    },
    addUserFriend: (state, {payload}: {payload: FriendType}) => {
      if (state.friends) {
        state.friends = {...state.friends, entities: [...state.friends.entities, payload]};
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFriendsByUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriendsByUserAction.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.error = null;
      })
      .addCase(getFriendsByUserAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {addUserFriend, deleteUserFriend} = friendsSlice.actions;
