import {AppConfig} from './app-config.interface';

export interface ApiConfig extends AppConfig {
  usersServiceURL: string;
  productsServiceURL: string;
  maxRedirects: number;
  clientTimeout: number;
};
