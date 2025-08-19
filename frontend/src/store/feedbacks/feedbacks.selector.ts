import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Feedbacks>;

export const selectFeedbacks = (state: State) => state[NameSpace.Feedbacks].feedbacks;
export const selectFeedbacksError = (state: State) => state[NameSpace.Feedbacks].error;
export const selectFeedbacksIsLoading = (state: State) => state[NameSpace.Feedbacks].isLoading;
