import {createSelector} from '@reduxjs/toolkit';

import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Balance>;

export const selectUserBalance = (state: State) => state[NameSpace.Balance].userBalance;
export const selectUserBalanceError = (state: State) => state[NameSpace.Balance].error;
export const selectUserBalanceIsLoading = (state: State) => state[NameSpace.Balance].isLoading;
export const selectMyPurchasedTrainings = createSelector(
  selectUserBalance,
  (userBalanceWithPagination) => {
    if (userBalanceWithPagination?.entities) {
      return userBalanceWithPagination.entities.map((entities) => entities.training);
    }

    return [];
  }
);
