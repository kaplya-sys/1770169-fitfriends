import {createSlice} from '@reduxjs/toolkit';

import {
  ErrorRequestType,
  NameSpace,
  UserApplicationStatusType,
  UserApplicationType
} from '../../libs/shared/types';
import {createUserApplicationAction, getUserApplicationsAction} from '../api-actions/user-application.api-action';

type InitialState = {
  userApplications: UserApplicationType[];
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  userApplications: [],
  error: null,
  isLoading: false
};

export const userApplicationsSlice = createSlice({
  name: NameSpace.UserApplications,
  initialState,
  reducers: {
    changeStatus: (state, {payload}: {payload: {id: string; status: UserApplicationStatusType}}) => {
      state.userApplications = state.userApplications.map((userApplication) => {
        if (userApplication.id === payload.id) {
          return ({...userApplication, status: payload.status});
        }

        return userApplication;
      });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createUserApplicationAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserApplicationAction.fulfilled, (state, action) => {
        state.userApplications = [action.payload];
        state.error = null;
      })
      .addCase(createUserApplicationAction.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getUserApplicationsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserApplicationsAction.fulfilled, (state, action) => {
        state.userApplications = action.payload;
        state.error = null;
      })
      .addCase(getUserApplicationsAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {changeStatus} = userApplicationsSlice.actions;
