import { fetchJSONEndpoint } from '../../utils/api';

export type Airport = {
  id: number;
  codeIata: string;
  latitude: string;
  longitude: string;
};

export function getAirports() {
  return fetchJSONEndpoint('/airports/all');
}
