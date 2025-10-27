import {isAxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {redirectToRoute} from '../action';
import {AppDispatch} from '../store';
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken
} from '../../services';
import {
  ApiRoute,
  AppRoute,
  AuthUserType,
  AuthenticatedUserType,
  ErrorRequestType,
  Role
} from '../../libs/shared/types';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {AUTH_ERROR_MESSAGE, REQUEST_ERROR_MESSAGE} from './api-actions.constant';
import {resetAuth} from '../auth/auth.slice';

export const registerAction = createAsyncThunk<AuthenticatedUserType, FormData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('user/register', async (data, {dispatch, rejectWithValue, extra: api}) => {
  try {
    const {data: user} = await api.post<AuthenticatedUserType>(ApiRoute.Register, data);

    setAccessToken(user.accessToken);
    setRefreshToken(user.refreshToken);
    dispatch(redirectToRoute({route: getRouteWithParam(AppRoute.Questionnaire, {id: user.id})}));

    return user;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const authAction = createAsyncThunk<AuthenticatedUserType, AuthUserType, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('user/auth', async (data, {dispatch, rejectWithValue, extra: api}) => {
  try {
    const {data: user} = await api.post<AuthenticatedUserType>(ApiRoute.Login, data);
    setAccessToken(user.accessToken);
    setRefreshToken(user.refreshToken);

    if (user.role === Role.User) {
      dispatch(redirectToRoute({route: AppRoute.Home}));

      return user;
    }
    dispatch(redirectToRoute({route: getRouteWithParam(AppRoute.PersonalAccount, {id: user.id})}));

    return user;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const checkAuthAction = createAsyncThunk<AuthenticatedUserType, void, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('user/checkAuth', async (_, {rejectWithValue, extra: api}) => {
  try {
    if (!getAccessToken()) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }
    const {data} = await api.post<AuthenticatedUserType>(ApiRoute.AuthCheck);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const logoutUserAction = createAsyncThunk<void, void, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('user/logoutUser', async (_, {dispatch, rejectWithValue, extra: api}) => {
  try {
    await api.post(ApiRoute.Logout);
    removeAccessToken();
    removeRefreshToken();
    dispatch(resetAuth());
    dispatch(redirectToRoute({route: AppRoute.Intro}));
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});
