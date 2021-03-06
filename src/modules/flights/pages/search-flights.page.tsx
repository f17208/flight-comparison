import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDebounce } from 'react-use';
import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useState } from 'react';

import {
  flightsSelector,
  sagaActions as flightsSagaActions,
  loadingSelector as flightsLoadingSelector,
} from '../store';
import {
  FlightPathSummaryItem,
  FlightPathMap,
  FlightPathDetails,
} from '../components';

import { FlightPathItem } from '../types';
import {
  calculateAlternativePaths,
  enrighFlightWithDetails,
  getFlightsPathDetails,
} from '../utils';

import {
  airportsSelector,
  loadingSelector as airportsLoadingSelector,
  setArrivalAirport,
  setDepartureAirport,
} from '../../airports/store';

import { ArrowBackIcon, ViewMoreIcon } from '../../common/icons';
import { PageSection } from '../../common/page-section/page-section.ui';
import { Typography } from '../../common/typography';
import { Button } from '../../common/button';
import { Loader } from '../../common/loader';
import { Link } from '../../common/link';

import { airlinesSelector } from '../../airlines/store';

import { CURRENCY_SYMBOL } from '../../../utils/constants';

export function SearchFlights() {
  const dispatch = useDispatch();
  const { departureCode, arrivalCode } = useParams();

  // we're using debounce to avoid duplicate requests whenever deps change
  useDebounce(
    () => {
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

  // we want to fill in the details about airports and airlines
  // so the children components (FlightPathSummaryItem) won't have to know
  // about how to fetch these pieces of information
  const fullFlightsPaths = useMemo(() => {
    return flightsPaths.map(flightsPath => {
      return flightsPath.map(flight => enrighFlightWithDetails(flight, allAirlines, allAirports))
        // if missing data, it will be excluded from the final results
        .filter(Boolean) as FlightPathItem[];
    });
  }, [flightsPaths, allAirports, allAirlines]);

  const [selectedPathIndex, setSelectedPathIndex] = useState<number>(0);

  useEffect(() => {
    setSelectedPathIndex(index => {
      return fullFlightsPaths.length < index
        ? 0
        : index;
    });
  }, [fullFlightsPaths, setSelectedPathIndex]);

  const { t } = useTranslation();

  if (!departureAirport || !arrivalAirport || !fullFlightsPaths.length) {
    return <Loader />;
  }

  return <PageSection>
    <div className="flex flex-col space-y-2">
      <Link to="/" className="text-secondary flex items-center space-x-1">
        <ArrowBackIcon className="h-4 fill-secondary w-fit" />
        <Typography variant="h5">{t('back-to-search')}</Typography>
      </Link>

      <Typography variant="h3">
        {t('search-results')}
      </Typography>

      <div className="flex justify-between">
        <div>
          <Typography variant="h4">
            {t('from')}{' '}
            <Link
              style={{ pointerEvents: departureAirport ? 'inherit' : 'none' }}
              to={`/airports/${departureAirport?.id}`}
              className="text-secondary"
            >
              {departureCode}
            </Link>
            {' '}{t('to')}{' '}
            <Link
              style={{ pointerEvents: arrivalAirport ? 'inherit' : 'none' }}
              to={`/airports/${arrivalAirport?.id}`}
              className="text-secondary"
            >
              {arrivalCode}
            </Link>
          </Typography>
        </div>
        {fullFlightsPaths.length > 0 && (
          <Typography variant="h5" className="mt-auto">
            {fullFlightsPaths.length} {t('possible-route', { count: fullFlightsPaths.length })}
          </Typography>
        )}
      </div>

      {fullFlightsPaths.length > 0 && (
        <div>
          <div
            className="
              px-3
              bg-slate-100
              rounded-lg rounded-b-none
              border border-2 border-slate-300 border-b-0
            "
          >
            {
              fullFlightsPaths.map((fullFlightPath, i) => (
                <FlightPathSummaryItem
                  key={i}
                  path={fullFlightPath}
                  divider={i !== fullFlightsPaths.length - 1}
                  action={
                    fullFlightsPaths.length > 1
                      ? (
                        <div className="flex space-x-1">
                          <Button
                            variant="contained"
                            color="info"
                            disabled={selectedPathIndex === i}
                            className="
                            ml-auto
                            px-3 py-1
                          "
                            onClick={() => setSelectedPathIndex(i)}
                          >
                            <ViewMoreIcon className="fill-inherit h-6 w-fit" />
                            <Typography className="font-extrabold">{t('view')}</Typography>
                          </Button>
                        </div>
                      )
                      : undefined
                  }
                />
              ))
            }
          </div>

          <div className="border border-2 border-slate-300 border-y-1">
            <FlightPathMap path={fullFlightsPaths[selectedPathIndex] || []} />
          </div>

          {fullFlightsPaths[selectedPathIndex] && (
            <div
              className="
                mb-8
                bg-slate-100
                border border-2 border-slate-300 border-t-0
                rounded-lg rounded-t-none
              "
            >
              <div className="p-3 pb-0">
                <FlightPathDetails path={fullFlightsPaths[selectedPathIndex]} />
              </div>

              <div className="mt-4 flex justify-end space-x-3 items-center p-2 bg-slate-200">
                <Typography variant="subtitle2">
                  {t('total')}: <strong>
                    {getFlightsPathDetails(fullFlightsPaths[selectedPathIndex]).totalPrice}
                    {' '}{CURRENCY_SYMBOL}
                  </strong>
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  className="
                    ml-auto
                    px-3
                  "
                  onClick={() => alert(t('not-implemented'))}
                >
                  <Typography className="font-extrabold">{t('book-now')}</Typography>
                </Button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  </PageSection>;
}
