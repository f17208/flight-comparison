import { FC } from 'react';
import { FlightItem } from './flight-item.ui';
import { Typography } from '../../common/typography';
import { FlightPathItem } from '../types';

export interface FlightPathDetailsProps {
  path: FlightPathItem[];
}

export const FlightPathDetails: FC<FlightPathDetailsProps> = ({
  path,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {path.map((flightPathItem, i) => {
        return <div className="flex space-x-1 items-center" key={flightPathItem.id}>
          <Typography variant="h5">
            #{i + 1}
          </Typography>
          <FlightItem
            flight={flightPathItem}
          />
        </div>;
      })}
    </div>
  );
};
