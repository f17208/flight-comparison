import axios from 'axios';
import { SHIPPYPRO_API_ENDPOINT, SHIPPYPRO_API_TOKEN } from './constants';

export function fetchJSONEndpoint(path: string) {
  const formattedPath = path.startsWith('/')
    ? path.substring(1)
    : path;
  return axios.get(`${SHIPPYPRO_API_ENDPOINT}/${formattedPath}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SHIPPYPRO_API_TOKEN}`,
    },
  });
}
