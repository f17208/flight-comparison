import { FC, useMemo, useState } from 'react';
import { CURRENCY_SYMBOL } from '../../utils/constants';
import { Button } from '../common/button/Button';
import { Dialog } from '../common/dialog/Dialog';
import { ViewMoreIcon } from '../common/icons';
import { Typography } from '../common/typography/Typography';
import { FlightItem } from './flight-item';
import { FlightPathItem } from './flights.types';

export interface FlightPathSummaryItemProps {
  path: FlightPathItem[];
  divider?: boolean;
}

export const FlightPathSummaryItem: FC<FlightPathSummaryItemProps> = ({
  path,
  divider,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { departureCode, arrivalCode, totalPrice, airlines } = useMemo(() => {
    return {
      departureCode: path[0].departureAirport.codeIata,
      arrivalCode: path[path.length - 1].arrivalAirport.codeIata,
      totalPrice: path.reduce((tot, b) => tot + b.price, 0),
      airlines: Array.from(
        new Set( // distinct
          path.map(flight => flight.airline),
        ),
      ),
    };
  }, [path]);

  return (
    <div
      className={`
        flex
        flex-col
        border-gray-500 ${divider ? 'border border-x-0 border-t-0' : ''}
        py-2
      `}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <Typography className="text-md sm:text-lg md:text-xl text-left w-full sm:w-fit">
            {
              path.length === 1
                ? 'Single flight,'
                : (path.length - 1 === 1)
                  ? '1 stop over,'
                  : `${path.length - 1} stop-overs,`
            }{' '}
            {airlines.length} {airlines.length === 1 ? 'airline' : 'airlines'}
          </Typography>
          <Typography variant="subtitle2">
            <strong>{totalPrice}{CURRENCY_SYMBOL}</strong>
          </Typography>
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            className="
              ml-auto
              px-3 py-1
            "
            onClick={() => setIsDialogOpen(true)}
          >
            <ViewMoreIcon className="fill-white h-6 w-fit" />
            <Typography className="font-extrabold">view</Typography>
          </Button>
        </div>
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={`From ${departureCode} to ${arrivalCode}`}
        body={
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
        }
      />
    </div>
  );
};
