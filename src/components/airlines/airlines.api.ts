import { fetchJSONEndpoint } from '../../utils/api';

export type Airline = {
  id: number;
  name: string;
  codeIataPrefix: string;
  logoFilename: string;
};

export function getAirlines() {
  return fetchJSONEndpoint('/airlines/all');
}
