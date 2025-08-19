import {createSlice} from '@reduxjs/toolkit';

import {authAction, checkAuthAction, registerAction} from '../api-actions/auth.api-actions';
import {
  AuthorizationStatusType,
  AuthorizationStatus,
  ErrorRequestType,
  NameSpace,
  AuthenticatedUserType
} from '../../libs/shared/types';

type InitialState = {
  authorizationStatus: AuthorizationStatusType;
  authenticatedUser: AuthenticatedUserType | null;
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authenticatedUser: null,
  error: null,
  isLoading: false
};

export const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authenticatedUser = action.payload;
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
        state.authenticatedUser = action.payload;
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
        state.authenticatedUser = action.payload;
        state.error = null;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.error = action.payload;
      });
  },
});
