import {AxiosInstance, isAxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ApiRoute,
  ErrorRequestType,
  RequestOptionsType,
  SubscriberType
} from '../../libs/shared/types';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {REQUEST_ERROR_MESSAGE} from './api-actions.constant';

export const addSubscriberAction = createAsyncThunk<void, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('subscribers/addSubscriber', async ({id}, {rejectWithValue, extra: api}) => {
  try {
    await api.post(getRouteWithParam(ApiRoute.AddSubscriber, {userId: id}));

  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const deleteSubscriberAction = createAsyncThunk<void, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('subscribers/deleteSubscriber', async ({id}, {rejectWithValue, extra: api}) => {
  try {
    await api.delete(getRouteWithParam(ApiRoute.DeleteSubscriber, {id}));

  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const getSubscribersAction = createAsyncThunk<SubscriberType[], RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('feedbacks/getFeedbacks', async ({id}, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<SubscriberType[]>(getRouteWithParam(ApiRoute.Subscribers, {userId: id}));

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});
