import {isAxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ApiRoute,
  ErrorRequestType,
  NameSpace,
  RequestOptionsType,
  UserBalanceType,
  PaginatedResponseType
} from '../../libs/shared/types';
import {AUTH_ERROR_MESSAGE, REQUEST_ERROR_MESSAGE} from './api-actions.constant';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {AppDispatch, RootState} from '../store';
import {useUserBalance} from '../user-balance/user-balance.slice';

export const getUserBalanceAction = createAsyncThunk<PaginatedResponseType<UserBalanceType>, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('balance/getUserBalance', async ({id, query}, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<PaginatedResponseType<UserBalanceType>>(getRouteWithParam(ApiRoute.UserBalance, {id}), {params: query});

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const applyUserBalanceAction = createAsyncThunk<UserBalanceType, RequestOptionsType, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
  state: RootState;
}>('balance/applyUserBalance', async ({id}, {dispatch, rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const user = state[NameSpace.Auth].authenticatedUser;

    if (!user) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }
    const {data} = await api.post<UserBalanceType>(getRouteWithParam(ApiRoute.UseUserBalance, {userId: user.id, trainingId: id}));
    dispatch(useUserBalance(data));

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});
