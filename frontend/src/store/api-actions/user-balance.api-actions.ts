import {isAxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ApiRoute,
  ErrorRequestType,
  NameSpace,
  UserBalanceType
} from '../../libs/shared/types';
import {AUTH_ERROR_MESSAGE, REQUEST_ERROR_MESSAGE} from './api-actions.constant';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {RootState} from '../store';

export const getUserBalanceAction = createAsyncThunk<UserBalanceType[], void, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
  state: RootState;
}>('balance/getUserBalance', async (_, {rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const user = state[NameSpace.User].user;

    if (!user) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }
    const {data} = await api.get<UserBalanceType[]>(getRouteWithParam(ApiRoute.UserBalance, {id: user.id}));

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});
