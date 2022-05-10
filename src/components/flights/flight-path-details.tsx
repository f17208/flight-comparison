import { FC, useMemo } from 'react';
import { CURRENCY_SYMBOL } from '../../utils/constants';
import { getFlightsPathDetails } from '../../utils/flights';
import { Button } from '../common/button/Button';
import { Typography } from '../common/typography/Typography';
import { FlightItem } from './flight-item';
import { FlightPathItem } from './flights.types';

export interface FlightPathDetailsProps {
  path: FlightPathItem[];
}

export const FlightPathDetails: FC<FlightPathDetailsProps> = ({
  path,
}) => {
  const { totalPrice } = useMemo(() => {
    return getFlightsPathDetails(path);
  }, [path]);

  return (
    <div>
      <div className="flex flex-col space-y-2">
        {path.map(flightPathItem => {
          return <FlightItem
            flight={flightPathItem}
            key={flightPathItem.id}
          />;
        })}
      </div>
      <div className="mt-4 flex justify-end space-x-3 items-center">
        <Typography variant="subtitle2">
          Total: <strong>{totalPrice}{CURRENCY_SYMBOL}</strong>
        </Typography>
        <Button
          variant="contained"
          color="success"
          className="
            ml-auto
            px-3
          "
          onClick={() => alert('Sorry, not implemented :)')}
        >
          <Typography className="font-extrabold">Book now</Typography>
        </Button>
      </div>
    </div>
  );
};
