import { FC, MouseEvent } from 'react';
import { AirlineIcon } from '../common/icons';
import { Typography } from '../common/typography/Typography';
import { Airline } from './airlines.types';

export interface AirlineItemProps {
  airline: Airline;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  showBorder?: boolean;
  showIata?: boolean;
}

export const AirlineItem: FC<AirlineItemProps> = ({
  airline,
  onClick,
  showBorder = true,
  showIata = true,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center
        py-1 pr-4
        w-full
        ${showBorder ? 'border' : ''}
        rounded-lg
        cursor-default
        ${onClick ? 'hover:bg-secondary hover:text-white hover:fill-white cursor-pointer' : ''}
        ${className || ''}
      `}
    >
      <AirlineIcon className="h-10 w-auto fill-gray-500 mx-2 fill-inherit" />
      <div className="flex flex-col">
        <Typography variant="h4" className="text-inherit text-left">
          {airline.name}
        </Typography>
        <Typography className={`text-left ${showIata ? '' : 'hidden'}`}>
          IATA: {airline.codeIataPrefix || 'n/a'}
        </Typography>
      </div>
    </button>
  );
};
