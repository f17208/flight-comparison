import { FC, useMemo } from 'react';
import { getAirportDetailsFromIATA } from '../../utils/airports';
import { Typography } from '../common/typography/Typography';
import { Airport } from './airports.types';

export interface AirportItemProps {
  airport: Airport;
  className?: string;
}

export const AirportDetails: FC<AirportItemProps> = ({
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
        Location: {airportDetails.city}, {airportDetails.state}, {airportDetails.country}
      </Typography>
    </div>
  );
};
