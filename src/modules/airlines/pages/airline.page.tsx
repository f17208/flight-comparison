import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  airlinesSelector,
  loadingSelector as airlinesLoadingSelector,
} from '../store';
import {
  airportsSelector,
  loadingSelector as airportsLoadingSelector,
} from '../../airports/store';
import {
  allFlightsSelector,
  loadingAllSelector,
} from '../../flights/store';

import { Typography } from '../../common/typography';
import { PageSection } from '../../common/page-section';
import { Loader } from '../../common/loader';

import { enrighFlightWithDetails } from '../../flights/utils';
import { FlightItem } from '../../flights/components';
import { FlightPathItem } from '../../flights/types';

export function Airline() {
  const airlines = useSelector(airlinesSelector);
  const airports = useSelector(airportsSelector);
  const flights = useSelector(allFlightsSelector);

  const { t } = useTranslation();

  const { airlineId } = useParams();

  const airline = useMemo(() => {
    return airlines.find(a => a.id.toString() === airlineId);
  }, [airlines, airlineId]);

  const airlinesloading = useSelector(airlinesLoadingSelector);
  const airportsloading = useSelector(airportsLoadingSelector);
  const flightsLoading = useSelector(loadingAllSelector);

  const loading = airlinesloading
    || airportsloading
    || flightsLoading;

  if (loading) {
    return (
      <Loader />
    );
  }

  const airlineFullFlights = useMemo(() => {
    return flights.filter(f => f.airlineId.toString() === airlineId)
      .map(f => enrighFlightWithDetails(f, airlines, airports))
      .filter(Boolean) as FlightPathItem[];
  }, [airlineId, airlines, airports, flights]);

  return <PageSection className="p-8">
    <div>
      <Typography variant="h3" className="text-neutral">
        {airline?.name}
      </Typography>
      <Typography variant="h5" className="text-accent">
        {t('iata-prefix')}: {airline?.codeIataPrefix}
      </Typography>

      <Typography variant="h4" className="mt-3 text-neutral">
        {t('flights')}
      </Typography>
      {
        airlineFullFlights.map(flight => {
          return <FlightItem key={flight.id} flight={flight} divider />;
        })
      }
    </div>
  </PageSection>;
}
