import { FC, MouseEvent, ReactNode } from 'react';
import { AirportIcon } from '../common/icons';
import { Typography } from '../common/typography/Typography';
import { Airport } from './airports.types';

export interface AirportItemProps {
  airport: Airport;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  endIcon?: ReactNode;
}

export const AirportItem: FC<AirportItemProps> = ({ airport, onClick, className, endIcon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-between
        w-full
        py-1 pr-4
        border
        h-10
        rounded-lg
        cursor-default
        ${onClick ? 'hover:bg-secondary hover:text-white hover:fill-white cursor-pointer' : ''}
        ${className || ''}
      `}
    >
      <div className="flex">
        <AirportIcon className="h-7 w-auto fill-gray-500 mx-2 fill-inherit" />
        <div className="flex flex-col">
          <Typography variant="h4" className="text-inherit">
            {airport.codeIata}
          </Typography>
        </div>
      </div>

      {endIcon && (
        endIcon
      )}
    </button>
  );
};
