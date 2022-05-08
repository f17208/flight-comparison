import { fetchJSONEndpoint } from '../utils/api';

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
