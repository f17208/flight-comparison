import { FC, MouseEvent, ReactNode, useMemo } from 'react';
import { Airport } from '../types';
import { getAirportFullName } from '../utils';
import { AirportIcon } from '../../common/icons';
import { Typography } from '../../common/typography';

export interface AirportItemProps {
  airport: Airport;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  button?: boolean;
  className?: string;
  endIcon?: ReactNode;
  highlight?: boolean;
}

export const AirportItem: FC<AirportItemProps> = ({
  airport,
  onClick,
  className,
  button = true,
  endIcon,
  highlight,
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
        border border-l-2
        h-10
        rounded-lg
        cursor-default
        text-neutral fill-neutral
        ${highlight ? 'border-l-primary' : 'border-l-gray'}
        ${(button || onClick) ? 'hover:bg-secondary hover:text-white hover:fill-white cursor-pointer' : ''}
        ${className || ''}
      `}
    >
      <div className="flex overflow-hidden">
        <AirportIcon className="h-6 w-auto mx-2 fill-inherit" />
        <Typography
          variant="h4"
          className="
            text-inherit font-inherit
            whitespace-nowrap overflow-hidden text-ellipsis
          "
        >
          {airportFullName}
        </Typography>
      </div>

      {endIcon && (
        endIcon
      )}
    </button>
  );
};
