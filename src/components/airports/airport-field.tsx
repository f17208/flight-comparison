import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode } from 'react';
import { Airport } from './airports.types';

export interface AirportFieldProps {
  value: Airport | null;
  labelClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
  label: string | ReactNode;
  inputProps?: Omit<
    DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'className'
  >
}

export const AirportField: FC<AirportFieldProps> = ({
  value,
  label,
  inputProps,
  containerClassName,
  labelClassName,
  inputClassName,
}) => {
  return (
    <div className={`flex ${containerClassName || ''}`}>
      <span
        className={`
          text-lg
          border
          rounded-l
          px-4 py-2
          bg-gray-300
          whitespace-no-wrap
          ${labelClassName || ''}
        `}
      >
        {label}
      </span>
      <input
        className={`
          border border-2 rounded-r px-4 py-2 w-full focus:outline-primary text-lg
          ${inputClassName}
        `}
        type="text"
        value={value?.codeIata || ''}
        {...inputProps}
      />
    </div>
  );
};
