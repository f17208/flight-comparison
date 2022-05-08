import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AirlineIcon } from '../common/icons';
import { Typography } from '../common/typography/Typography';
import { Airline } from './airlines.api';

export interface AirlineItemProps {
  airline: Airline;
}

export const AirlineItem: FC<AirlineItemProps> = ({ airline }) => {
  return (
    <Link to={`/airlines/${airline.id}`}>
      <div
        className="
          flex items-center
          py-1 my-1
          border
          rounded-lg
          hover:bg-secondary hover:text-white hover:fill-white
        "
      >
        <AirlineIcon className="h-10 w-auto fill-gray-500 mx-2 fill-inherit" />
        <div className="flex flex-col">
          <Typography variant="h4" className="text-inherit">
            {airline.name}
          </Typography>
          <Typography>
            IATA: {airline.codeIataPrefix || 'n/a'}
          </Typography>
        </div>
      </div>
    </Link>
  );
};
