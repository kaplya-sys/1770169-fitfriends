import {createSlice} from '@reduxjs/toolkit';

import {ErrorRequest, Guitar, NameSpace} from '../../libs/shared/types';
import {
  createGuitarAction,
  getGuitarAction,
  removeGuitarAction,
  updateGuitarAction
} from '../api-actions/guitar.api-actions';

type InitialState = {
  guitar: Guitar | null;
  isLoading: boolean;
  error: ErrorRequest | string | null | undefined;
};

const initialState: InitialState = {
  guitar: null,
  isLoading: false,
  error: null
};

export const guitarSlice = createSlice({
  name: NameSpace.Guitar,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGuitarAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGuitarAction.fulfilled, (state, action) => {
        state.guitar = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getGuitarAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })
      .addCase(createGuitarAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGuitarAction.fulfilled, (state, action) => {
        state.guitar = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createGuitarAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })
      .addCase(updateGuitarAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGuitarAction.fulfilled, (state, action) => {
        state.guitar = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateGuitarAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })
      .addCase(removeGuitarAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeGuitarAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeGuitarAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      });
  },
});
