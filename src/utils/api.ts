import axios from 'axios';
import { SHIPPYPRO_API_ENDPOINT, SHIPPYPRO_API_TOKEN } from './constants';

export const client = axios.create({
  baseURL: SHIPPYPRO_API_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${SHIPPYPRO_API_TOKEN}`,
  },
});
