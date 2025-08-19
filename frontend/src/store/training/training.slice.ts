import {createSlice} from '@reduxjs/toolkit';

import {ErrorRequestType, NameSpace, TrainingType} from '../../libs/shared/types';
import {
  createTrainingAction,
  getTrainingAction,
  removeTrainingAction,
  updateTrainingAction
} from '../api-actions/training.api-actions';

type InitialState = {
  training: TrainingType | null;
  isLoading: boolean;
  error: ErrorRequestType | string | null | undefined;
};

const initialState: InitialState = {
  training: null,
  isLoading: false,
  error: null
};

export const trainingSlice = createSlice({
  name: NameSpace.Training,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createTrainingAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrainingAction.fulfilled, (state, action) => {
        state.training = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createTrainingAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getTrainingAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainingAction.fulfilled, (state, action) => {
        state.training = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTrainingAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTrainingAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTrainingAction.fulfilled, (state, action) => {
        state.training = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateTrainingAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeTrainingAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeTrainingAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeTrainingAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
