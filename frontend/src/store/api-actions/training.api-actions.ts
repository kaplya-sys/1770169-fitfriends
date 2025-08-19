import {AxiosInstance, isAxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ApiRoute,
  ErrorRequestType,
  NameSpace,
  PaginatedResponseType,
  RequestOptionsType,
  TrainingType,
  UpdateTrainingType
} from '../../libs/shared/types';
import {REQUEST_ERROR_MESSAGE, TRAINING_ERROR_MESSAGE} from './api-actions.constant';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {RootState} from '../store';

export const getTrainingsAction = createAsyncThunk<PaginatedResponseType<TrainingType>, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('trainings/getTrainings', async ({query}, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<PaginatedResponseType<TrainingType>>(ApiRoute.Trainings, {params: query});

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const getRecommendedTrainingsAction = createAsyncThunk<TrainingType[], void, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('trainings/getRecommendedTrainings', async (_, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<TrainingType[]>(ApiRoute.RecommendedTrainings);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const getTrainingAction = createAsyncThunk<TrainingType, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('training/getTraining', async ({id}, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<TrainingType>(getRouteWithParam(ApiRoute.Training, {id}));

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const createTrainingAction = createAsyncThunk<TrainingType, FormData, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('training/createTraining', async (data, {rejectWithValue, extra: api}) => {
  try {
    const {data: training} = await api.post<TrainingType>(ApiRoute.CreateTraining, data);

    return training;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const updateTrainingAction = createAsyncThunk<TrainingType, UpdateTrainingType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
  state: RootState;
}>('training/updateTraining', async (updateData, {rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const training = state[NameSpace.Training].training;

    if (!training) {
      throw new Error(TRAINING_ERROR_MESSAGE);
    }
    const {data} = await api.patch<TrainingType>(getRouteWithParam(ApiRoute.EditTraining, {id: training.id}), updateData);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const removeTrainingAction = createAsyncThunk<void, RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('training/removeTraining', async ({id}, {rejectWithValue, extra: api}) => {
  try {
    await api.delete(getRouteWithParam(ApiRoute.DeleteTraining, {id}));
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

