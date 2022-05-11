import { FC, useMemo } from 'react';

import { Typography } from '../../common/typography';
import { Airport } from '../types';
import { getAirportDetailsFromIATA } from '../utils';

export interface AirportDetailsProps {
  airport: Airport;
  className?: string;
}

export const AirportDetails: FC<AirportDetailsProps> = ({
  airport,
  className,
}) => {
  const airportDetails = useMemo(() => {
    return airport
      ? getAirportDetailsFromIATA(airport?.codeIata)
      : null;
  }, [airport]);

  if (!airportDetails) return null;

  return (
    <div className={className}>
      <Typography variant="h4" className="text-neutral">
        {airportDetails.name}
      </Typography>
      <Typography className="text-neutral">
        {airportDetails.city}, {airportDetails.state}, {airportDetails.country}
      </Typography>
    </div>
  );
};
