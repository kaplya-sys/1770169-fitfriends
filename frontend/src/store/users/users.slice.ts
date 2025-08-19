import {createSlice} from '@reduxjs/toolkit';

import {getUsersAction} from '../api-actions/user.api-actions';
import {ErrorRequestType, NameSpace, UserType} from '../../libs/shared/types';

type InitialState = {
  users: UserType[];
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  users: [],
  error: null,
  isLoading: false
};

export const usersSlice = createSlice({
  name: NameSpace.Users,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersAction.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getUsersAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
