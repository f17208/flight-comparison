import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDebounce } from 'react-use';

import { useEffect, useMemo } from 'react';
import { BackIcon } from '../common/icons';
import { PageSection } from '../common/layout/PageSection';
import { Typography } from '../common/typography/Typography';

import { sagaActions as flightsSagaActions } from './flights.saga';
import { sagaActions as airportsSagaActions } from '../airports/airports.saga';
import { sagaActions as airlinesSagaActions } from '../airlines/airlines.saga';

import {
  airportsSelector,
  loadingSelector as airportsLoadingSelector,
  setArrivalAirport,
  setDepartureAirport,
} from '../airports/airports.slice';

import {
  flightsSelector,
  loadingSelector as flightsLoadingSelector,
} from './flights.slice';
import { calculateAlternativePaths } from '../../utils/flights';

export function SearchFlights() {
  const dispatch = useDispatch();
  const { departureCode, arrivalCode } = useParams();

  // we're using debounce to avoid duplicate requests
  // TODO: investigate why hook dependencies were updated twice
  useDebounce(
    () => {
      dispatch({
        type: airportsSagaActions.FETCH_ALL_AIRPORTS,
      });
      dispatch({
        type: airlinesSagaActions.FETCH_ALL_AIRLINES,
      });
      dispatch({
        type: flightsSagaActions.FETCH_SEARCH_FLIGHTS,
        payload: {
          departureCode,
          arrivalCode,
        },
      });
    },
    100,
    [departureCode, arrivalCode],
  );

  const allAirports = useSelector(airportsSelector);
  const flights = useSelector(flightsSelector);

  const airportsLoading = useSelector(airportsLoadingSelector);
  const flightsLoading = useSelector(flightsLoadingSelector);

  const departureAirport = allAirports.find(a => a.codeIata === departureCode) || null;
  const arrivalAirport = allAirports.find(a => a.codeIata === arrivalCode) || null;

  // this is just to keep state consistent between page reloads
  useEffect(() => {
    dispatch(setArrivalAirport(arrivalAirport));
  }, [dispatch, arrivalAirport]);

  useEffect(() => {
    dispatch(setDepartureAirport(departureAirport));
  }, [dispatch, arrivalAirport]);

  const loading = airportsLoading
   || flightsLoading;

  const flightsPaths = useMemo(() => {
    if (!loading && departureAirport && arrivalAirport && flights.length) {
      return calculateAlternativePaths(departureAirport, arrivalAirport, flights);
    }
    return [];
  }, [flights, loading, arrivalAirport, departureAirport]);

  return <PageSection>
    <div className="flex flex-col space-y-2">
      <Link to="/" className="text-secondary flex items-center space-x-1">
        <BackIcon className="h-4 fill-secondary w-fit" />
        <Typography variant="h5">Back</Typography>
      </Link>

      <Typography variant="h3">
        Search Flights
      </Typography>

      <Typography variant="h4">
        {' from '}
        <Link
          style={{ pointerEvents: departureAirport ? 'inherit' : 'none' }}
          to={`/airports/${departureAirport?.id}`}
          className="text-secondary"
        >
          {departureCode}
        </Link>
        {' to '}
        <Link
          style={{ pointerEvents: arrivalAirport ? 'inherit' : 'none' }}
          to={`/airports/${arrivalAirport?.id}`}
          className="text-secondary"
        >
          {arrivalCode}
        </Link>
      </Typography>

      <pre>
        {JSON.stringify(flightsPaths, null, 2)}
      </pre>
    </div>
  </PageSection>;
}
