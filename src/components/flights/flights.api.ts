import { fetchJSONEndpoint } from '../../utils/api';

export type Flight = {
  id: number;
  airlineId: number;
  departureAirportId: number;
  arrivalAirportId: number;
  price: number;
};

export function getFlights() {
  return fetchJSONEndpoint('/flights/all');
}

export function getSearchFlights(departureCode: string, arrivalCode: string) {
  return fetchJSONEndpoint(`/flights/from/${departureCode}/to/${arrivalCode}`);
}
