import { FC, ReactNode, useMemo } from 'react';
import { CURRENCY_SYMBOL } from '../../utils/constants';
import { getFlightsPathDetails } from '../../utils/flights';
import { Typography } from '../common/typography/Typography';
import { FlightPathItem } from './flights.types';

export interface FlightPathSummaryItemProps {
  path: FlightPathItem[];
  divider?: boolean;
  action?: ReactNode;
}

export const FlightPathSummaryItem: FC<FlightPathSummaryItemProps> = ({
  path,
  divider,
  action,
}) => {
  const { totalPrice, airlines } = useMemo(() => {
    return getFlightsPathDetails(path);
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
        {action && (
          <div>
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
