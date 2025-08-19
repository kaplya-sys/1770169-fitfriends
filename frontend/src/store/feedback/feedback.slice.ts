import {createSlice} from '@reduxjs/toolkit';

import {createFeedbackAction} from '../api-actions/feedback.api-actions';
import {ErrorRequestType, FeedbackType, NameSpace} from '../../libs/shared/types';

type InitialState = {
  feedback: FeedbackType | null;
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  feedback: null,
  error: null,
  isLoading: false
};

export const feedbackSlice = createSlice({
  name: NameSpace.Feedback,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createFeedbackAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFeedbackAction.fulfilled, (state, action) => {
        state.feedback = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createFeedbackAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
