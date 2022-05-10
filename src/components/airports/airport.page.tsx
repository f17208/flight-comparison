import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { sagaActions } from './airports.saga';

import { Typography } from '../common/typography/Typography';
import { PageSection } from '../common/layout/PageSection';
import { airportsSelector } from './airports.slice';

export function Airport() {
  const dispatch = useDispatch();
  const airports = useSelector(airportsSelector);
  const { airportId } = useParams();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_ALL_AIRPORTS });
  }, [dispatch]);

  const airport = useMemo(() => {
    return airports.find(a => a.id.toString() === airportId);
  }, [airports, airportId]);

  return <PageSection className="p-8">
    <div>
      <Typography variant="h3" className="text-neutral">
        {airport?.codeIata}
      </Typography>

    </div>
  </PageSection>;
}
