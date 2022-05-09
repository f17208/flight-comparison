import { Dispatch, FC, SetStateAction } from 'react';
import { Dialog, DialogProps } from '../common/dialog/Dialog';
import { Input } from '../common/input/Input';
import { AirportItem } from './airport-item';
import { Airport } from './airports.api';

export interface SelectAirportProps {
  options: Airport[];
  onSelect: (airport: Airport | null) => void;
  selectedAirport: Airport | null;
  search: string;
  setSearch: (search: string) => void | Dispatch<SetStateAction<string>>;
}

export const SelectAirport: FC<SelectAirportProps> = ({
  onSelect,
  options,
  search,
  setSearch,
  selectedAirport,
}) => {
  return (
    <div>
      {
        selectedAirport
          ? <AirportItem airport={selectedAirport} onClick={() => onSelect(null)} />
          : <Input onChange={e => setSearch(e.target.value)} value={search} />
      }
      <hr />
      <ul>
        {
          options.map((airport) => (
            <li key={airport.id}>
              <AirportItem airport={airport} onClick={() => onSelect(airport)} />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export interface SelectAirportDialogProps extends SelectAirportProps {
  dialogProps: Omit<DialogProps, 'body'>;
}

export const SelectAirportDialog: FC<SelectAirportDialogProps> = ({
  dialogProps: {
    title,
    onClose,
    ...otherDialogProps
  },
  onSelect,
  ...props
}) => {
  return (
    <Dialog
      title={title || 'Select Airport'}
      {...otherDialogProps}
      onClose={onClose}
      body={
        <SelectAirport onSelect={onSelect} {...props} />
      }
    />
  );
};
