import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDebounce } from 'react-use';

import { BackIcon } from '../common/icons';
import { PageSection } from '../common/layout/PageSection';
import { Typography } from '../common/typography/Typography';

import { sagaActions as flightsSagaActions } from './flights.saga';
import { sagaActions as airportsSagaActions } from '../airports/airports.saga';
import { sagaActions as airlinesSagaActions } from '../airlines/airlines.saga';
import {
  airlinesSelector,
  loadingSelector as airlinesLoadingSelector,
} from '../airlines/airlines.slice';
import {
  airportsSelector,
  loadingSelector as airportsLoadingSelector,
} from '../airports/airports.slice';

import {
  flightsSelector,
  loadingSelector as flightsLoadingSelector,
} from './flights.slice';

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
  const allAirlines = useSelector(airlinesSelector);
  const flights = useSelector(flightsSelector);

  const airportsLoading = useSelector(airportsLoadingSelector);
  const airlinesLoading = useSelector(airlinesLoadingSelector);
  const flightsLoading = useSelector(flightsLoadingSelector);

  const departureAirport = allAirports.find(a => a.codeIata === departureCode);
  const arrivalAirport = allAirports.find(a => a.codeIata === arrivalCode);

  const loading = airportsLoading
   || airlinesLoading
   || flightsLoading;

  console.log('loading', loading, allAirlines, flights);

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

    </div>
  </PageSection>;
}
