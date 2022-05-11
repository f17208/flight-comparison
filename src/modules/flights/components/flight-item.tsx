import { FC } from 'react';
import { Link } from 'react-router-dom';

import { FlightPathItem } from '../types';

import { CURRENCY_SYMBOL } from '../../../utils/constants';
import { ArrowForwardIcon, FlightIcon } from '../../common/icons';
import { Typography } from '../../common/typography';

export interface FlightItemProps {
  flight: FlightPathItem;
  divider?: boolean;
  className?: string;
}

export const FlightItem: FC<FlightItemProps> = ({ flight, divider, className }) => {
  return (
    <div
      className={`
        flex items-center space-x-1 py-1
        ${divider ? 'border border-t-0 border-x-0' : ''}
        ${className || ''}
      `}
    >
      <FlightIcon className="h-7 w-auto mx-2 fill-inherit" />
      <div className="flex flex-col">
        <div className="flex flex-row space-x-2 items-center">
          <Link
            style={{ pointerEvents: flight.departureAirportId ? 'inherit' : 'none' }}
            to={`/airports/${flight.departureAirportId}`}
            className="text-secondary font-bold"
          >
            {flight.departureAirport.codeIata}
          </Link>

          <ArrowForwardIcon className="h-3 w-auto mx-2 fill-inherit" />

          <Link
            style={{ pointerEvents: flight.arrivalAirportId ? 'inherit' : 'none' }}
            to={`/airports/${flight.arrivalAirportId}`}
            className="text-secondary font-bold"
          >
            {flight.arrivalAirport.codeIata}
          </Link>
        </div>
        <div className="flex flex-row space-x-1 items-center">
          <Typography variant="subtitle1" className="text-inherit">
            {flight.airline.name}
          </Typography>
          <Typography variant="subtitle1" className="text-inherit">
            <strong>({flight.price}{CURRENCY_SYMBOL})</strong>
          </Typography>
        </div>
      </div>
    </div>
  );
};
