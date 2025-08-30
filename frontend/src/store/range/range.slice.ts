import {createSlice} from '@reduxjs/toolkit';

import {ErrorRequestType, NameSpace, RangeFiltersType} from '../../libs/shared/types';
import {getRangeFiltersAction} from '../api-actions/training.api-actions';

type InitialState = {
  rangeFilters: RangeFiltersType;
  isLoading: boolean;
  error: ErrorRequestType | string | null | undefined;
}

const initialState: InitialState = {
  rangeFilters: {
    price: {
      min: 0,
      max: 0
    },
    calories: {
      min: 0,
      max: 0
    }
  },
  isLoading: false,
  error: null
};

export const rangeSlice = createSlice({
  name: NameSpace.RangeFilters,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRangeFiltersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRangeFiltersAction.fulfilled, (state, action) => {
        state.rangeFilters = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getRangeFiltersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});
