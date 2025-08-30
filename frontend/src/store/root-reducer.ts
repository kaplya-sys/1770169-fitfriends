import {combineReducers} from '@reduxjs/toolkit';

import {NameSpace} from '../libs/shared/types';
import {userSlice} from './user/user.slice';
import {usersSlice} from './users/users.slice';
import {trainingSlice} from './training/training.slice';
import {trainingsSlice} from './trainings/trainings.slice';
import {authSlice} from './auth/auth.slice';
import {feedbackSlice} from './feedback/feedback.slice';
import {feedbacksSlice} from './feedbacks/feedbacks.slice';
import {userBalanceSlice} from './user-balance/user-balance.slice';
import {recommendedTrainingsSlice} from './recommended-trainings/recommended-trainings.slice';
import {orderSlice} from './order/order.slice';

import {rangeSlice} from './range/range.slice';

export const rootReducer = combineReducers({
  [NameSpace.Auth]: authSlice.reducer,
  [NameSpace.Balance]: userBalanceSlice.reducer,
  [NameSpace.Feedback]: feedbackSlice.reducer,
  [NameSpace.Feedbacks]: feedbacksSlice.reducer,
  [NameSpace.Order]: orderSlice.reducer,
  [NameSpace.RecommendedTrainings]: recommendedTrainingsSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Users]: usersSlice.reducer,
  [NameSpace.Training]: trainingSlice.reducer,
  [NameSpace.Trainings]: trainingsSlice.reducer,
  [NameSpace.RangeFilters]: rangeSlice.reducer
});
