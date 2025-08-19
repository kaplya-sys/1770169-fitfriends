import {createSelector} from '@reduxjs/toolkit';

import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';
import {promotions, RatingRange} from '../../libs/shared/constants';
import {addPromo} from '../../libs/shared/helpers';

type State = Pick<Store, NameSpace.Trainings>;

export const selectTrainings = (state: State) => state[NameSpace.Trainings].trainingsWithPagination;
export const selectTrainingsError = (state: State) => state[NameSpace.Trainings].error;
export const selectTrainingsIsLoading = (state: State) => state[NameSpace.Trainings].isLoading;
export const selectSpecialTrainings = createSelector(
  selectTrainings,
  (trainingsWithPagination) => {
    if (trainingsWithPagination?.entities) {
      return addPromo(trainingsWithPagination?.entities, promotions);
    }

    return [];
  }
);
export const selectPopularTrainings = createSelector(
  selectTrainings,
  (trainingsWithPagination) => trainingsWithPagination?.entities.filter((training) => training.rating === RatingRange.Max)
);
