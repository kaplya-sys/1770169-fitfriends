import {isAxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ApiRoute,
  ErrorRequestType,
  NameSpace,
  CreateOrderType,
  OrderType
} from '../../libs/shared/types';
import {REQUEST_ERROR_MESSAGE, TRAINING_ERROR_MESSAGE} from './api-actions.constant';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {RootState} from '../store';

export const createOrderAction = createAsyncThunk<OrderType, CreateOrderType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
  state: RootState;
}>('order/createOrder', async (createData, {rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const training = state[NameSpace.Training].training;

    if (!training) {
      throw new Error(TRAINING_ERROR_MESSAGE);
    }
    const {data} = await api.post<OrderType>(getRouteWithParam(ApiRoute.CreateOrder, {id: training.id}), createData);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});
