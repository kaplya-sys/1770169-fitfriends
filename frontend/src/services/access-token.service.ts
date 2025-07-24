import {ACCESS_TOKEN_KEY} from './service.const';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
export const setAccessToken = (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token);
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);
