import {REFRESH_TOKEN_KEY} from './service.const';

export const getRefreshToken = (): string => localStorage.getItem(REFRESH_TOKEN_KEY) ?? '';
export const setRefreshToken = (token: string) => localStorage.setItem(REFRESH_TOKEN_KEY, token);
export const removeRefreshToken = (): void => localStorage.removeItem(REFRESH_TOKEN_KEY);
