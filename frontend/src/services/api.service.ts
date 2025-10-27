import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {toast} from 'react-toastify';

import {getAccessToken, removeAccessToken, setAccessToken} from './access-token.service';
import {getRefreshToken, removeRefreshToken, setRefreshToken} from './refresh-token.service';
import {ApiRoute, InternalAxiosRequestConfigWithRetry, TokenType} from '../libs/shared/types';
import {API_URL, REFRESH_TOKEN_ERROR, REQUEST_TIMEOUT} from './service.const';

export const createApi = () => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  api.interceptors.response.use((response) => response, async (error: AxiosError) => {
    const config = error.config as InternalAxiosRequestConfigWithRetry;

    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error(REFRESH_TOKEN_ERROR);
        }
        const {data} = await api.post<TokenType>(ApiRoute.RefreshToken, {refreshToken});
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        config.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(config);
      } catch (refreshError) {
        removeAccessToken();
        removeRefreshToken();

        return Promise.reject(refreshError);
      }
    }

    if (error.response?.data && error.response?.status !== 400) {
      if (
        error.response.data !== null &&
        typeof error.response.data === 'object' &&
        'message' in error.response.data &&
        typeof error.response.data.message === 'string'
      ) {
        toast.warn(error.response?.data.message);
      }
    }

    return Promise.reject(error);
  });

  return api;
};
