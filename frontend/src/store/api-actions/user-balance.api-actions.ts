import { PaginatedResponseType } from './../../libs/shared/types/lib/paginated-response.type';
import {isAxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ApiRoute,
  ErrorRequestType,
  RequestOptionsType,
  UserBalanceType
} from '../../libs/shared/types';
import {REQUEST_ERROR_MESSAGE} from './api-actions.constant';
import {getRouteWithParam} from '../../libs/shared/helpers';

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
