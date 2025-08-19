import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Feedback>;

export const selectFeedback = (state: State) => state[NameSpace.Feedback].feedback;
export const selectFeedbackError = (state: State) => state[NameSpace.Feedback].error;
export const selectFeedbackIsLoading = (state: State) => state[NameSpace.Feedback].isLoading;
