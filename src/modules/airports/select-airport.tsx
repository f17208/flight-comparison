import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import { compareTwoStrings } from 'string-similarity';
import { Dialog, DialogProps } from '../common/dialog/Dialog';
import { Input } from '../common/input/Input';
import { AirportItem, AirportItemProps } from './airport-item';
import { Airport } from './airports.types';
import { ClearIcon } from '../common/icons';
import { getAirportFullName } from '../../utils/airports';

export interface SelectAirportProps {
  options: Airport[];
  onSelect: (airport: Airport | null, closeOnSelect?: boolean) => void;
  selectedAirport: Airport | null;
  search: string;
  setSearch: (search: string) => void | Dispatch<SetStateAction<string>>;
  selectedAirportProps?: AirportItemProps;
  getOptionsProps?: (option: Airport, index: number) => Omit<AirportItemProps, 'airport'>;
}

export const SelectAirport: FC<SelectAirportProps> = ({
  onSelect,
  options,
  search,
  setSearch,
  selectedAirport,
  selectedAirportProps,
  getOptionsProps,
}) => {
  const optionsToShow: { airport: Airport; similarity: number }[] = useMemo(() => {
    const searchCaseInsensitive = search.toLowerCase();
    // map options to an array of couples (option, similarity)
    const toReturn = options
      .map(airport => {
        const toMatch = getAirportFullName(airport).toLowerCase();
        const similarity = compareTwoStrings(toMatch, searchCaseInsensitive);
        return {
          airport,
          similarity,
        };
      })
      .filter(({ airport }) => {
        if (!search) return true;
        if (airport.id !== selectedAirport?.id) return true;
        return false;
      });

    // sort options by similarity
    toReturn.sort(({ similarity: scoreA }, { similarity: scoreB }) => {
      return scoreA > scoreB ? -1 : 1;
    });

    return toReturn;
  }, [options, selectedAirport, search]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="w-full mb-1">
        {
          selectedAirport
            ? (
              <AirportItem
                airport={selectedAirport}
                className="bg-primary"
                endIcon={(
                  <ClearIcon
                    className="h-5 w-fit fill-inherit hover:cursor-pointer"
                    onClick={() => onSelect(null, false)}
                  />
                )}
                {...selectedAirportProps}
              />
            )
            : (
              <Input
                className="w-full"
                onChange={e => setSearch(e.target.value)}
                value={search}
              />
            )
        }
      </div>
      <hr />
      <div>
        {
          optionsToShow
            .map(({ airport }, i) => {
              return <AirportItem
                key={airport.id}
                airport={airport}
                onClick={() => onSelect(airport)}
                className="my-1"
                {
                  ...(
                    getOptionsProps
                      ? getOptionsProps(airport, i)
                      : {}
                  )
                }
              />;
            })
        }
      </div>
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
