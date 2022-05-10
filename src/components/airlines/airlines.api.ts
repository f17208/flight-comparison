import { fetchJSONEndpoint } from '../../utils/api';

export function getAirlines() {
  return fetchJSONEndpoint('/airlines/all');
}
