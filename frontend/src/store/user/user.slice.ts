import {createSlice} from '@reduxjs/toolkit';

import {authAction, checkAuthAction, registerAction} from '../api-actions/user.api-actions';
import {
  Authorization,
  AuthorizationStatus,
  ErrorRequest,
  NameSpace,
  User
} from '../../libs/shared/types';

type InitialState = {
  authorizationStatus: Authorization;
  user: User | null;
  error: ErrorRequest | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
  isLoading: false
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(authAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(authAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.error = action.payload;
      });
  },
});
