import {createSlice} from '@reduxjs/toolkit';

import {
  ErrorRequestType,
  NameSpace,
  PaginatedResponseType,
  TrainingType
} from '../../libs/shared/types';
import {getTrainingsAction} from '../api-actions/training.api-actions';

type InitialState = {
  trainingsWithPagination: PaginatedResponseType<TrainingType> | null;
  isLoading: boolean;
  error: ErrorRequestType | string | null | undefined;
};

const initialState: InitialState = {
  trainingsWithPagination: null,
  isLoading: false,
  error: null
};

export const trainingsSlice = createSlice({
  name: NameSpace.Trainings,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTrainingsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainingsAction.fulfilled, (state, action) => {
        state.trainingsWithPagination = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTrainingsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
