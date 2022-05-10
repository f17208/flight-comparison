import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Typography } from '../common/typography/Typography';
import { PageSection } from '../common/layout/PageSection';
import { airlinesSelector } from './airlines.slice';

export function Airline() {
  const airlines = useSelector(airlinesSelector);
  const { airlineId } = useParams();

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
