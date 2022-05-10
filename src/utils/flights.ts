import { Airport } from '../components/airports/airports.types';
import { Flight, FlightPathItem } from '../components/flights/flights.types';

function getSuccessiveAirportsDAG(
  flights: Flight[],
) {
  // each airport id is associated to an array of airport ids
  // an airport B is pushed into airport A's array if and only if there is
  // a flight connecting A to B
  const successiveAirports: Record<number, number[]> = {};

  const distinctAirports = new Set(
    flights.flatMap(flight => [flight.departureAirportId, flight.arrivalAirportId]),
  );

  distinctAirports.forEach(airportId => {
    successiveAirports[airportId] = flights
      .filter(flight => flight.departureAirportId === airportId)
      .map(flight => flight.arrivalAirportId);
  });

  return successiveAirports;
}

export function calculateAlternativePaths(
  departureAirport: Airport,
  arrivalAirport: Airport,
  flights: Flight[],
) {
  const successiveAirports = getSuccessiveAirportsDAG(flights);

  // now we have a Directed Acyclyc Graph represented as a map of node -> array of successive nodes
  // we want to traverse it depth-first in order to get all the possible paths
  // from its root (departure airport) to its only leaf (arrival airport)
  const visitSubGraphDepthFirst: (rootId: number, path: number[]) => Array<number[]> = (
    rootId,
    path,
  ) => {
    const nextNodes = successiveAirports[rootId];

    const pathUpdated: number[] = [...path, rootId];

    // ending condition: no next nodes or current node is the arrival airport
    if (!nextNodes || nextNodes.length === 0 || rootId === arrivalAirport.id) {
      return [pathUpdated];
    }
    // if there exist some next nodes, each one of them
    // is the new root of a sub-graph we want to traverse
    return nextNodes.flatMap(newRoot => (
      visitSubGraphDepthFirst(newRoot, pathUpdated)
    ));
  };

  const pathsAsAirportIdsArrays = visitSubGraphDepthFirst(departureAirport.id, []);

  // now we want to convert the paths we calculated from arrays of airport ids
  // to arrays of flights
  return pathsAsAirportIdsArrays.map(
    airportIdsArray => (
      airportIdsArray.map(
        (airportId, i) => {
          if (i !== airportIdsArray.length - 1) {
            const flightToReturn = flights.find(
              flight => (
                airportId === flight.departureAirportId
                  && airportIdsArray[i + 1] === flight.arrivalAirportId
              ),
            );
            return flightToReturn;
          }
          return null;
        },
      ).filter(Boolean) as Flight[]
    ),
  );
}

export function getFlightsPathDetails(path: FlightPathItem[]) {
  return {
    totalPrice: path.reduce((tot, b) => tot + b.price, 0).toFixed(2),
    airlines: Array.from(
      new Set( // distinct
        path.map(flight => flight.airline),
      ),
    ),
  };
}
