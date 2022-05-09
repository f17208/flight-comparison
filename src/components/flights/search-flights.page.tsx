import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PageSection } from '../common/layout/PageSection';
import { Typography } from '../common/typography/Typography';
import { sagaActions } from './flights.saga';

export function SearchFlights() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_ALL_FLIGHTS });
  }, [dispatch]);

  return <PageSection>
    <div>
      <Typography variant="h3">
        Search Flights
      </Typography>

    </div>
  </PageSection>;
}
