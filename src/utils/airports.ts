import { Airport, AirportDetails } from '../modules/airports/airports.types';
import AirportsJSON from '../data/airports.json';

export function getAirportDetailsFromIATA(iataCode: string) {
  return (AirportsJSON as AirportDetails[])
    .find(item => item.code === iataCode);
}

export function getAirportFullName({ codeIata }: Airport) {
  const airportDetails = getAirportDetailsFromIATA(codeIata);
  return `${codeIata} ${airportDetails ? `(${airportDetails.name})` : ''}`;
}
