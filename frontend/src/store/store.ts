import {configureStore} from '@reduxjs/toolkit';

import {createApi} from '../services';
import {redirect} from './middleware/redirect.middleware';
import {rootReducer} from './root-reducer';

export const api = createApi();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
});
export type Store = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
