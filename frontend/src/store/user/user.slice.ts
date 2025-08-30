import {createSlice} from '@reduxjs/toolkit';

import {createQuestionnaireAction, getUserAction, updateUserAction} from '../api-actions/user.api-actions';
import {ErrorRequestType, NameSpace, UserType} from '../../libs/shared/types';

type InitialState = {
  user: UserType | null;
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  user: null,
  error: null,
  isLoading: false
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    deleteUserAvatar: (state) => {
      delete state.user?.avatar;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createQuestionnaireAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestionnaireAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createQuestionnaireAction.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {deleteUserAvatar} = userSlice.actions;
