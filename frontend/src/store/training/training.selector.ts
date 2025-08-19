import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Training>;

export const selectTraining = (state: State) => state[NameSpace.Training].training;
export const selectTrainingError = (state: State) => state[NameSpace.Training].error;
export const selectTrainingIsLoading = (state: State) => state[NameSpace.Training].isLoading;
