import {createSlice} from '@reduxjs/toolkit';

import {ErrorRequestType, NameSpace, SubscriberType} from '../../libs/shared/types';
import {getSubscribersAction} from '../api-actions/subscribers.api-actions';

type InitialState = {
  subscribers: SubscriberType[];
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  subscribers: [],
  error: null,
  isLoading: false
};

export const subscribersSlice = createSlice({
  name: NameSpace.Subscribers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSubscribersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscribersAction.fulfilled, (state, action) => {
        state.subscribers = action.payload;
        state.error = null;
      })
      .addCase(getSubscribersAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
