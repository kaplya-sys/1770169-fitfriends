import {AxiosInstance, isAxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ErrorRequest,
  FormDataWithPayload,
  Guitar,
  PaginatedResponse,
  Query,
  RequestOptionsType
} from '../../libs/shared/types';
import {REQUEST_ERROR_MESSAGE} from './api-actions.constant';

export const getGuitarsAction = createAsyncThunk<PaginatedResponse<Guitar>, Query, {
  extra: AxiosInstance;
  rejectValue: ErrorRequest | string;
}>('guitar/getGuitars', async (query, {rejectWithValue, extra: api}) => {
  try {
    const {data: guitars} = await api.get<PaginatedResponse<Guitar>>('/products', {params: query});

    return guitars;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequest);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const getGuitarAction = createAsyncThunk<Guitar, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequest | string;
}>('guitar/getGuitar', async (options, {rejectWithValue, extra: api}) => {
  try {
    const {data: guitar} = await api.get<Guitar>(`/products/${options?.id as string}`);

    return guitar;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequest);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const createGuitarAction = createAsyncThunk<Guitar, FormData, {
  extra: AxiosInstance;
  rejectValue: ErrorRequest | string;
}>('guitar/createGuitar', async (data, {rejectWithValue, extra: api}) => {
  try {
    const {data: guitar} = await api.post<Guitar>('/products/add', data);

    return guitar;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequest);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const updateGuitarAction = createAsyncThunk<Guitar, FormDataWithPayload, {
  extra: AxiosInstance;
  rejectValue: ErrorRequest | string;
}>('guitar/updateGuitar', async (data, {rejectWithValue, extra: api}) => {
  try {
    const {data: guitar} = await api.put<Guitar>(`/products/${data.id}/update`, data.formData);

    return guitar;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequest);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const removeGuitarAction = createAsyncThunk<void, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequest | string;
}>('guitar/removeGuitar', async (options, {rejectWithValue, extra: api}) => {
  try {
    await api.delete(`/products/${options?.id as string}/delete`);
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequest);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

