import {createSlice} from '@reduxjs/toolkit';

import {
  ErrorRequestType,
  NameSpace,
  TrainingType
} from '../../libs/shared/types';
import {getRecommendedTrainingsAction} from '../api-actions/training.api-actions';

type InitialState = {
  recommendedTrainings: TrainingType[];
  isLoading: boolean;
  error: ErrorRequestType | string | null | undefined;
};

const initialState: InitialState = {
  recommendedTrainings: [],
  isLoading: false,
  error: null
};

export const recommendedTrainingsSlice = createSlice({
  name: NameSpace.RecommendedTrainings,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRecommendedTrainingsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecommendedTrainingsAction.fulfilled, (state, action) => {
        state.recommendedTrainings = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getRecommendedTrainingsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
