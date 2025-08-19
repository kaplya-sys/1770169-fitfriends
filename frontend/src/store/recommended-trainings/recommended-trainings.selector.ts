import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.RecommendedTrainings>;

export const selectRecommendedTrainings = (state: State) => state[NameSpace.RecommendedTrainings].recommendedTrainings;
export const selectRecommendedTrainingsError = (state: State) => state[NameSpace.RecommendedTrainings].error;
export const selectRecommendedTrainingsIsLoading = (state: State) => state[NameSpace.RecommendedTrainings].isLoading;
