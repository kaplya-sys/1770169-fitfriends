import {isAxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ApiRoute,
  ErrorRequestType,
  RequestOptionsType,
  NotificationType
} from '../../libs/shared/types';
import {REQUEST_ERROR_MESSAGE} from './api-actions.constant';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {AppDispatch} from '../store';
import {deleteNotification} from '../notifications/notifications.slice';

export const getNotificationsAction = createAsyncThunk<NotificationType[], void, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('notifications/getNotifications', async (_, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<NotificationType[]>(ApiRoute.Notifications);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const deleteNotificationAction = createAsyncThunk<void, RequestOptionsType, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('notifications/deleteNotification', async ({id}, {dispatch, rejectWithValue, extra: api}) => {
  try {
    await api.delete(getRouteWithParam(ApiRoute.DeleteNotification, {id}));

    dispatch(deleteNotification(id as string));
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});
