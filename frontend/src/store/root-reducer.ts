import {combineReducers} from '@reduxjs/toolkit';

import {NameSpace} from '../libs/shared/types';
import {userSlice} from './user/user.slice';
import {guitarSlice} from './guitar/guitar.slice';
import {guitarsSlice} from './guitars/guitars.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Guitar]: guitarSlice.reducer,
  [NameSpace.Guitars]: guitarsSlice.reducer
});
