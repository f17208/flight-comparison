import { FC, MouseEvent } from 'react';
import { Button } from '../common/button/Button';
import { Typography } from '../common/typography/Typography';
import { Flight } from './flights.api';

export interface FlightPathSummaryItemProps {
  path: Flight[];
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  divider?: boolean;
}

export const FlightPathSummaryItem: FC<FlightPathSummaryItemProps> = ({
  path,
  onClick,
  className,
  divider,
}) => {
  // distinct airlines involved
  const airlinesCount = Array.from(
    new Set(
      path.map(flight => flight.airlineId),
    ),
  ).length;

  return (
    <div
      className={`
        flex
        flex-col
        border-gray-500 ${divider ? 'border border-x-0 border-t-0' : ''}
        py-2
      `}
    >
      <div className="flex items-center justify-between">
        <Typography>
          {
            path.length === 1
              ? 'Single flight'
              : `${path.length - 1} step-overs`
          }, {airlinesCount} airlines
        </Typography>
        <Button
          variant="contained"
          className={className}
          onClick={onClick}
        >
          see more
        </Button>
      </div>
    </div>
  );
};
