import { FC, MouseEvent, ReactNode, useMemo } from 'react';
import { getAirportFullName } from './airports.utils';
import { AirportIcon } from '../common/icons';
import { Typography } from '../common/typography/Typography';
import { Airport } from './airports.types';

export interface AirportItemProps {
  airport: Airport;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  button?: boolean;
  className?: string;
  endIcon?: ReactNode;
}

export const AirportItem: FC<AirportItemProps> = ({
  airport,
  onClick,
  className,
  button = true,
  endIcon,
}) => {
  const airportFullName = useMemo(() => {
    return getAirportFullName(airport);
  }, [airport]);

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
        text-neutral fill-neutral
        ${(button || onClick) ? 'hover:bg-secondary hover:text-white hover:fill-white cursor-pointer' : ''}
        ${className || ''}
      `}
    >
      <div className="flex">
        <AirportIcon className="h-6 w-auto mx-2 fill-inherit" />
        <div className="flex flex-col">
          <Typography variant="h4" className="text-inherit font-inherit">
            {airportFullName}
          </Typography>
        </div>
      </div>

      {endIcon && (
        endIcon
      )}
    </button>
  );
};