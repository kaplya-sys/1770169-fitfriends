import {createSlice} from '@reduxjs/toolkit';

import {getUserBalanceAction} from '../api-actions/user-balance.api-actions';
import {ErrorRequestType, NameSpace, PaginatedResponseType, UserBalanceType,} from '../../libs/shared/types';

type InitialState = {
  userBalance: PaginatedResponseType<UserBalanceType> | null;
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  userBalance: null,
  error: null,
  isLoading: false
};

export const userBalanceSlice = createSlice({
  name: NameSpace.Balance,
  initialState,
  reducers: {
    useUserBalance: (state, {payload}: {payload: UserBalanceType}) => {
      if (state.userBalance) {
        const index = state.userBalance.entities.findIndex((entity) => entity.id === payload.id);
        state.userBalance.entities[index] = payload;
      }
    }
  },
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

export const {useUserBalance} = userBalanceSlice.actions;
