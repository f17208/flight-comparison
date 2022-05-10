import { Airline } from '../airlines/airlines.types';
import { Airport } from '../airports/airports.types';

export type Flight = {
  id: number;
  airlineId: number;
  departureAirportId: number;
  arrivalAirportId: number;
  price: number;
};

export interface FlightPathItem extends Flight {
  arrivalAirport: Airport;
  departureAirport: Airport;
  airline: Airline;
}
