import {InternalAxiosRequestConfig} from 'axios';

export interface InternalAxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
