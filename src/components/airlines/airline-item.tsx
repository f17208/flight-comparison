import { FC, MouseEvent } from 'react';
import { AirlineIcon } from '../common/icons';
import { Typography } from '../common/typography/Typography';
import { Airline } from './airlines.api';

export interface AirlineItemProps {
  airline: Airline;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export const AirlineItem: FC<AirlineItemProps> = ({ airline, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex items-center
        py-1 my-1
        w-full
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
    </button>
  );
};
