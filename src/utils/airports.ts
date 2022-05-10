import { AirportDetails } from '../components/airports/airports.types';
import AirportsJSON from '../data/airports.json';

export function getAirportDetailsFromIATA(iataCode: string) {
  return (AirportsJSON as AirportDetails[])
    .find(item => item.code === iataCode);
}
