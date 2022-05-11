import axios from 'axios';
import { SHIPPYPRO_API_ENDPOINT } from './constants';
import { getToken } from './tokens';

export const client = axios.create({
  baseURL: SHIPPYPRO_API_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  async config => {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${await getToken()}`,
    };
    return config;
  },
  error => {
    Promise.reject(error);
  },
);
