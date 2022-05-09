import { FC, MouseEvent } from 'react';
import { AirportIcon } from '../common/icons';
import { Typography } from '../common/typography/Typography';
import { Airport } from './airports.api';

export interface AirportItemProps {
  airport: Airport;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
}

export const AirportItem: FC<AirportItemProps> = ({ airport, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center
        w-full
        py-1 pr-4
        border
        h-10
        rounded-lg
        hover:bg-secondary hover:text-white hover:fill-white
        ${className || ''}
      `}
    >
      <AirportIcon className="h-7 w-auto fill-gray-500 mx-2 fill-inherit" />
      <div className="flex flex-col">
        <Typography variant="h4" className="text-inherit">
          {airport.codeIata}
        </Typography>
      </div>
    </button>
  );
};
