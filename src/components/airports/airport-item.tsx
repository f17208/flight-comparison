import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AirportIcon } from '../common/icons';
import { Typography } from '../common/typography/Typography';
import { Airport } from './airports.api';

export interface AirportItemProps {
  airport: Airport;
}

export const AirportItem: FC<AirportItemProps> = ({ airport }) => {
  return (
    <Link to={`/airport/${airport.id}`}>
      <div
        className="
          flex items-center
          py-1 my-1
          border
          rounded-lg
          hover:bg-secondary hover:text-white hover:fill-white
        "
      >
        <AirportIcon className="h-8 w-auto fill-gray-500 mx-2 fill-inherit" />
        <div className="flex flex-col">
          <Typography variant="h4" className="text-inherit">
            {airport.codeIata}
          </Typography>
        </div>
      </div>
    </Link>
  );
};
