import { fetchJSONEndpoint } from '../../utils/api';

export function getFlights() {
  return fetchJSONEndpoint('/flights/all');
}

export function getSearchFlights(departureCode: string, arrivalCode: string) {
  return fetchJSONEndpoint(`/flights/from/${departureCode}/to/${arrivalCode}`);
}
