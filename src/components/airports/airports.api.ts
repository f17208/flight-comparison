import { fetchJSONEndpoint } from '../../utils/api';

export function getAirports() {
  return fetchJSONEndpoint('/airports/all');
}
