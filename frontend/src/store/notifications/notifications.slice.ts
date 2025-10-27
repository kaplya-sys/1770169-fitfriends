import {createSlice} from '@reduxjs/toolkit';

import {ErrorRequestType, NameSpace, NotificationType} from '../../libs/shared/types';
import {getNotificationsAction} from '../api-actions/notifications.api-actions';

type InitialState = {
  notifications: NotificationType[];
  error: ErrorRequestType | string | null | undefined;
  isLoading: boolean;
};

const initialState: InitialState = {
  notifications: [],
  error: null,
  isLoading: false
};

export const notificationsSlice = createSlice({
  name: NameSpace.Notifications,
  initialState,
  reducers: {
    deleteNotification: (state, {payload}: {payload: string}) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getNotificationsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotificationsAction.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.error = null;
      })
      .addCase(getNotificationsAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {deleteNotification} = notificationsSlice.actions;
