import {createSlice} from '@reduxjs/toolkit';

import {getOrdersByUserAction} from '../api-actions/order.api-actions';
import {ErrorRequestType, NameSpace, OrderType, PaginatedResponseType} from '../../libs/shared/types';

type InitialState = {
  orders: PaginatedResponseType<OrderType> | null;
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  orders: null,
  error: null,
  isLoading: false
};

export const ordersSlice = createSlice({
  name: NameSpace.Orders,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrdersByUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersByUserAction.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getOrdersByUserAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
