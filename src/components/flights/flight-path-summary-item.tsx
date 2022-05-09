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
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Typography className="text-xl">
          {
            path.length === 1
              ? 'Single flight,'
              : `${path.length - 1} stop-overs,`
          }{' '}
          {airlinesCount > 1 ? `${airlinesCount} airlines,` : ''}{' '}
          from <strong>{totalPrice}{CURRENCY_SYMBOL}</strong>
        </Typography>
        <div className="w-full md:w-fit">
          <Button
            variant="contained"
            className="ml-auto bg-green-500 hover:bg-green-600 pr-2"
            onClick={onClick}
          >
            <Typography className="font-extrabold">see more</Typography>
            <ChevronRightIcon className="fill-white h-6 w-fit" />
          </Button>
        </div>
      </div>
    </div>
  );
};
