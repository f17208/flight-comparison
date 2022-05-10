import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { sagaActions } from './airlines.saga';

import { Typography } from '../common/typography/Typography';
import { PageSection } from '../common/layout/PageSection';
import { airlinesSelector } from './airlines.slice';

export function Airline() {
  const dispatch = useDispatch();
  const airlines = useSelector(airlinesSelector);
  const { airlineId } = useParams();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_ALL_AIRLINES });
  }, [dispatch]);

  const airline = useMemo(() => {
    return airlines.find(a => a.id.toString() === airlineId);
  }, [airlines, airlineId]);

  if (!airline) { // TODO
    return (
      <div>
        Error...
      </div>
    );
  }

  return <PageSection className="p-8">
    <div>
      <Typography variant="h3" className="text-neutral">
        {airline?.name}
      </Typography>
      <Typography variant="h5" className="text-accent">
        IATA Prefix: {airline?.codeIataPrefix}
      </Typography>
    </div>
  </PageSection>;
}
