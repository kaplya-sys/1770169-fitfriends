import {createSlice} from '@reduxjs/toolkit';

import {getUserBalanceAction} from '../api-actions/user-balance.api-actions';
import {ErrorRequestType, NameSpace, UserBalanceType,} from '../../libs/shared/types';

type InitialState = {
  userBalance: UserBalanceType[];
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  userBalance: [],
  error: null,
  isLoading: false
};

export const userBalanceSlice = createSlice({
  name: NameSpace.Balance,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserBalanceAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserBalanceAction.fulfilled, (state, action) => {
        state.userBalance = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserBalanceAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
