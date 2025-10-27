import {createSlice} from '@reduxjs/toolkit';

import {getFeedbacksAction} from '../api-actions/feedback.api-actions';
import {ErrorRequestType, FeedbackType, NameSpace} from '../../libs/shared/types';

type InitialState = {
  feedbacks: FeedbackType[];
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  feedbacks: [],
  error: null,
  isLoading: false
};

export const feedbacksSlice = createSlice({
  name: NameSpace.Feedbacks,
  initialState,
  reducers: {
    addFeedback: (state, {payload}: {payload: FeedbackType}) => {
      state.feedbacks = [payload, ...state.feedbacks];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFeedbacksAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedbacksAction.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getFeedbacksAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {addFeedback} = feedbacksSlice.actions;
