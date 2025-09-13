import {isAxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ApiRoute,
  ErrorRequestType,
  FriendType,
  NameSpace,
  PaginatedResponseType,
  RequestOptionsType
} from '../../libs/shared/types';
import {AUTH_ERROR_MESSAGE, REQUEST_ERROR_MESSAGE} from './api-actions.constant';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {AppDispatch, RootState} from '../store';
import {addUserFriend, deleteUserFriend} from '../friends/friends.slice';

export const addFriendAction = createAsyncThunk<FriendType, RequestOptionsType, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
  state: RootState;
}>('friend/addFriend', async ({id}, {dispatch, rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const user = state[NameSpace.Auth].authenticatedUser;

    if (!user) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }
    const {data} = await api.post<FriendType>(getRouteWithParam(ApiRoute.AddFriend, {userId: user.id, friendId: id}));

    dispatch(addUserFriend(data));
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const getFriendsByUserAction = createAsyncThunk<PaginatedResponseType<FriendType>, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
  state: RootState;
}>('friends/getFriendsByUser', async ({query}, {rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const user = state[NameSpace.Auth].authenticatedUser;

    if (!user) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }
    const {data} = await api.get<PaginatedResponseType<FriendType>>(getRouteWithParam(ApiRoute.UserFriends, {id: user.id}), {params: query});

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const deleteFriendAction = createAsyncThunk<void, RequestOptionsType, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
  state: RootState;
}>('friend/deleteFriend', async ({id}, {dispatch, rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const user = state[NameSpace.Auth].authenticatedUser;

    if (!user) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }
    await api.delete(getRouteWithParam(ApiRoute.DeleteFriend, {userId: user.id, friendId: id}));
    dispatch(deleteUserFriend(id));
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});
