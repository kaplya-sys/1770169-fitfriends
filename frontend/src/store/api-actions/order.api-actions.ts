import {isAxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ApiRoute,
  ErrorRequestType,
  NameSpace,
  CreateOrderType,
  OrderType,
  PaginatedResponseType,
  RequestOptionsType
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

export const getOrdersByUserAction = createAsyncThunk<PaginatedResponseType<OrderType>, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('orders/getOrdersByUser', async ({query}, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<PaginatedResponseType<OrderType>>(ApiRoute.Orders, {params: query});

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const getOrderAction = createAsyncThunk<OrderType, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('order/getOrder', async ({id}, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<OrderType>(getRouteWithParam(ApiRoute.Order, {id}));

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});
