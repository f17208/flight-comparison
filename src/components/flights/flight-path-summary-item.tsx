import { FC, MouseEvent, useMemo } from 'react';
import { CURRENCY_SYMBOL } from '../../utils/constants';
import { Button } from '../common/button/Button';
import { ChevronRightIcon } from '../common/icons';
import { Typography } from '../common/typography/Typography';
import { Flight } from './flights.api';

export interface FlightPathSummaryItemProps {
  path: Flight[];
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  divider?: boolean;
}

export const FlightPathSummaryItem: FC<FlightPathSummaryItemProps> = ({
  path,
  onClick,
  divider,
}) => {
  // distinct airlines involved
  const airlinesCount = Array.from(
    new Set(
      path.map(flight => flight.airlineId),
    ),
  ).length;

  const totalPrice = useMemo(() => {
    return path.reduce((tot, b) => tot + b.price, 0);
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
          <Typography className="text-xl text-left w-full sm:w-fit">
            {
              path.length === 1
                ? 'Single flight,'
                : `${path.length - 1} stop-overs,`
            }{' '}
            {airlinesCount > 1 ? `${airlinesCount} airlines` : ''}{' '}
          </Typography>
          <Typography variant="subtitle2">
            <strong>{totalPrice}{CURRENCY_SYMBOL}</strong>
          </Typography>
        </div>
        <div>
          <Button
            variant="contained"
            className="ml-auto bg-green-500 hover:bg-green-600 py-2 pr-2 pl-1 sm:pr-2 sm:pl-4"
            onClick={onClick}
          >
            <Typography className="font-extrabold hidden sm:block">see more</Typography>
            <ChevronRightIcon className="fill-white h-6 w-fit" />
          </Button>
        </div>
      </div>
    </div>
  );
};
