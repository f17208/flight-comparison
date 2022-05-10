import { FC } from 'react';
import { FlightItem } from './flight-item';
import { FlightPathItem } from './flights.types';

export interface FlightPathDetailsProps {
  path: FlightPathItem[];
}

export const FlightPathDetails: FC<FlightPathDetailsProps> = ({
  path,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {path.map(flightPathItem => {
        return <FlightItem
          flight={flightPathItem}
          key={flightPathItem.id}
        />;
      })}
    </div>
  );
};
