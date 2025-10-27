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
import {AUTH_ERROR_MESSAGE, REQUEST_ERROR_MESSAGE, TRAINING_ERROR_MESSAGE} from './api-actions.constant';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {AppDispatch, RootState} from '../store';
import {getUserBalanceAction} from './user-balance.api-actions';

export const createOrderAction = createAsyncThunk<OrderType, CreateOrderType, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
  state: RootState;
}>('order/createOrder', async (createData, {dispatch, rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const training = state[NameSpace.Training].training;
    const user = state[NameSpace.Auth].authenticatedUser;

    if (!user) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }

    if (!training) {
      throw new Error(TRAINING_ERROR_MESSAGE);
    }
    const {data} = await api.post<OrderType>(getRouteWithParam(ApiRoute.CreateOrder, {id: training.id}), createData);
    dispatch(getUserBalanceAction({id: user.id}));

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
