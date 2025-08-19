import {createSlice} from '@reduxjs/toolkit';

import {createOrderAction} from '../api-actions/order.api-actions';
import {ErrorRequestType, NameSpace, UserType} from '../../libs/shared/types';

type InitialState = {
  order: UserType | null;
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  order: null,
  error: null,
  isLoading: false
};

export const orderSlice = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrderAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrderAction.fulfilled, (state, action) => {
        state.order = action.payload;
        state.error = null;
      })
      .addCase(createOrderAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
