import {AxiosInstance, isAxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ApiRoute,
  CreateFeedbackType,
  ErrorRequestType,
  FeedbackType,
  NameSpace,
  RequestOptionsType
} from '../../libs/shared/types';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {REQUEST_ERROR_MESSAGE, TRAINING_ERROR_MESSAGE} from './api-actions.constant';
import {RootState} from '../store';

export const createFeedbackAction = createAsyncThunk<FeedbackType, CreateFeedbackType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
  state: RootState;
}>('feedback/createFeedback', async (createData, {rejectWithValue, extra: api, getState}) => {
  try {
    const state = getState();
    const training = state[NameSpace.Training].training;

    if (!training) {
      throw new Error(TRAINING_ERROR_MESSAGE);
    }
    const {data} = await api.post<FeedbackType>(getRouteWithParam(ApiRoute.CreateTrainingFeedback, {id: training.id}), createData);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});

export const getFeedbacksAction = createAsyncThunk<FeedbackType[], RequestOptionsType, {
  extra: AxiosInstance;
  rejectValue: ErrorRequestType | string;
}>('feedbacks/getFeedbacks', async ({id}, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.get<FeedbackType[]>(getRouteWithParam(ApiRoute.TrainingFeedbacks, {id}));

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequestType);
    }
    return rejectWithValue(error instanceof Error ? error.message : REQUEST_ERROR_MESSAGE);
  }
});
