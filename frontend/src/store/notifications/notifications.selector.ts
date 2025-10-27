import {NameSpace} from '../../libs/shared/types';
import {Store} from '../store';

type State = Pick<Store, NameSpace.Notifications>;

export const selectNotifications = (state: State) => state[NameSpace.Notifications].notifications;
export const selectNotificationsError = (state: State) => state[NameSpace.Notifications].error;
export const selectNotificationsIsLoading = (state: State) => state[NameSpace.Notifications].isLoading;
