import { FC } from 'react';
import { CURRENCY_SYMBOL } from '../../utils/constants';
import { ArrowForwardIcon, FlightIcon } from '../common/icons';
import { Typography } from '../common/typography/Typography';
import { FlightPathItem } from './flights.types';

export interface FlightItemProps {
  flight: FlightPathItem;
}

export const FlightItem: FC<FlightItemProps> = ({ flight }) => {
  return (
    <div className="flex items-center space-x-1">
      <FlightIcon className="h-7 w-auto mx-2 fill-inherit" />
      <div className="flex flex-col">
        <div className="flex flex-row space-x-2 items-center">
          <Typography variant="h5" className="text-inherit">
            {flight.departureAirport.codeIata}
          </Typography>
          <ArrowForwardIcon className="h-3 w-auto mx-2 fill-inherit" />
          <Typography variant="h5" className="text-inherit">
            {flight.arrivalAirport.codeIata}
          </Typography>
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
