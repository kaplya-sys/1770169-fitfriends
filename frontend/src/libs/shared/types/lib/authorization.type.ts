import {AuthorizationStatus} from './authorization-status.enum';

export type Authorization = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
