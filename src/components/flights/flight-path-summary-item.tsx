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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <Typography className="text-left w-full sm:w-fit">
            {
              path.length === 1
                ? 'Single flight,'
                : (path.length - 1 === 1)
                  ? '1 stop over,'
                  : `${path.length - 1} stop-overs,`
            }{' '}
            {airlines.length} {airlines.length === 1 ? 'airline' : 'airlines'}
          </Typography>
        </div>
        <div className="flex items-center space-x-2 justify-between">
          <Typography variant="subtitle2">
            <strong>{totalPrice}{CURRENCY_SYMBOL}</strong>
          </Typography>
          {action && action}
        </div>
      </div>
    </div>
  );
};
