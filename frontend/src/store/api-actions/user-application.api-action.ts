import {isAxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ApiRoute,
  ErrorRequestType,
  CreateUserApplicationType,
  UpdateUserApplicationType,
  UserApplicationType
} from '../../libs/shared/types';
import {REQUEST_ERROR_MESSAGE} from './api-actions.constant';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {changeStatus} from '../user-applications/user-applications.slice';
import {AppDispatch} from '../store';

export const createUserApplicationAction = createAsyncThunk<UserApplicationType, CreateUserApplicationType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('userApplication/createUserApplication', async (userApplicationData, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.post<UserApplicationType>(ApiRoute.CreateUserApplication, userApplicationData);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const updateUserApplicationAction = createAsyncThunk<void, UpdateUserApplicationType & {applicationId: string}, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('userApplication/updateUserApplication', async ({applicationId, status}, {dispatch, rejectWithValue, extra: api}) => {
  try {
    await api.patch<void>(getRouteWithParam(ApiRoute.UpdateUserApplication, {applicationId}), {status});
    dispatch(changeStatus({id: applicationId, status}));
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const getUserApplicationsAction = createAsyncThunk<UserApplicationType[], void, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('userApplication/getUserApplications', async (_, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<UserApplicationType[]>(ApiRoute.UserApplications);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});
