import {isAxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {redirectToRoute} from '../action';
import {
  ApiRoute,
  ErrorRequestType,
  Role,
  UserType,
  NameSpace,
  AppRoute,
  RequestOptionsType,
  PaginatedResponseType
} from '../../libs/shared/types';
import {AUTH_ERROR_MESSAGE, REQUEST_ERROR_MESSAGE} from './api-actions.constant';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {AppDispatch, RootState} from '../store';
import {deleteUserAvatar} from '../user/user.slice';
import {removeAccessToken, removeRefreshToken} from '../../services';

export const createQuestionnaireAction = createAsyncThunk<UserType, FormData, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
  state: RootState;
}>('user/createQuestionnaire', async (createData, {dispatch, rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const user = state[NameSpace.Auth].authenticatedUser;

    if (!user) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }

    if (user.role === Role.User) {
      const {data} = await api.post<UserType>(getRouteWithParam(ApiRoute.CreateUserQuestionnaire, {id: user.id}), createData);
      dispatch(redirectToRoute({route: AppRoute.Home}));
      return data;
    }
    const {data} = await api.post<UserType>(getRouteWithParam(ApiRoute.CreateCoachQuestionnaire, {id: user.id}), createData);
    dispatch(redirectToRoute({route: getRouteWithParam(AppRoute.PersonalAccount, {id: user.id})}));

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const updateUserAction = createAsyncThunk<UserType, FormData, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
  state: RootState;
}>('user/updateUser', async (formData, {rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const user = state[NameSpace.Auth].authenticatedUser;

    if (!user) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }
    const {data} = await api.patch<UserType>(getRouteWithParam(ApiRoute.EditUser, {id: user.id}), formData);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const getUserAction = createAsyncThunk<UserType, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('user/getUser', async ({id}, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<UserType>(getRouteWithParam(ApiRoute.User, {id}));

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const getUsersAction = createAsyncThunk<PaginatedResponseType<UserType>, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('users/getUsers', async ({query}, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<PaginatedResponseType<UserType>>(ApiRoute.Users, {params: query});

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const deleteUserAvatarAction = createAsyncThunk<void, void, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  state: RootState;
  rejectValue: ErrorRequestType | string;
}>('user/deleteUserAvatar', async (_, {dispatch, rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const user = state[NameSpace.Auth].authenticatedUser;

    if (!user) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }
    await api.delete(getRouteWithParam(ApiRoute.DeleteUserAvatar, {id: user.id}));
    dispatch(deleteUserAvatar());
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const deleteUserAction = createAsyncThunk<void, void, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  state: RootState;
  rejectValue: ErrorRequestType | string;
}>('user/deleteUser', async (_, {dispatch, rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const user = state[NameSpace.Auth].authenticatedUser;

    if (!user) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }
    await api.delete(getRouteWithParam(ApiRoute.DeleteUser, {id: user.id}));
    removeAccessToken();
    removeRefreshToken();
    dispatch(redirectToRoute({route: AppRoute.Intro}));
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const deleteQualificationFileAction = createAsyncThunk<void, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('user/deleteQualificationFile', async ({id}, {rejectWithValue, extra: api}) => {
  try {
    await api.delete(getRouteWithParam(ApiRoute.DeleteQualificationFile, {id}));
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const updateQualificationFileAction = createAsyncThunk<UserType, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('user/updateQualificationFile', async ({id, formData}, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.patch<UserType>(getRouteWithParam(ApiRoute.UpdateQualificationFile, {id}), formData);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});
