import {createSlice} from '@reduxjs/toolkit';

import {ErrorRequest, Guitar, NameSpace, PaginatedResponse} from '../../libs/shared/types';
import {getGuitarsAction} from '../api-actions/guitar.api-actions';

type InitialState = {
  guitars: PaginatedResponse<Guitar> | null;
  isLoading: boolean;
  error: ErrorRequest | string | null | undefined;
};

const initialState: InitialState = {
  guitars: null,
  isLoading: false,
  error: null
};

export const guitarsSlice = createSlice({
  name: NameSpace.Guitars,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGuitarsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGuitarsAction.fulfilled, (state, action) => {
        state.guitars = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getGuitarsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
