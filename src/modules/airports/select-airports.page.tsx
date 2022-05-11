import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Airport } from './airports.types';
import {
  airportsSelector,
  arrivalAirportSelector,
  departureAirportSelector,
  setArrivalAirport,
  setDepartureAirport,
} from './airports.slice';
import { SelectAirportDialog } from './select-airport';
import { useSelectAirportDialog } from './select-airport.hooks';
import { AirportField } from './airport-field';

import { Button } from '../common/button/Button';
import { PageSection } from '../common/layout/PageSection';
import { Typography } from '../common/typography/Typography';
import { ChevronRightIcon } from '../common/icons';

export function SelectAirportsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allAirports = useSelector(airportsSelector);
  const departureAirport = useSelector(departureAirportSelector);
  const arrivalAirport = useSelector(arrivalAirportSelector);

  const availableAirports = useMemo(() => {
    return allAirports.filter(airport => {
      return airport.id !== departureAirport?.id
        && airport.id !== arrivalAirport?.id;
    });
  }, [allAirports, arrivalAirport, departureAirport]);

  const onSetDepartureAirport = useCallback((airport: Airport | null) => {
    dispatch(setDepartureAirport(airport));
  }, [dispatch]);

  const onSetArrivalAirport = useCallback((airport: Airport | null) => {
    dispatch(setArrivalAirport(airport));
  }, [dispatch]);

  const departureDialog = useSelectAirportDialog(departureAirport, onSetDepartureAirport);
  const arrivalDialog = useSelectAirportDialog(arrivalAirport, onSetArrivalAirport);

  const goToNextPage = useCallback(() => {
    if (!departureAirport || !arrivalAirport) {
      console.error('Missing arrival or departure airport'); // this shouldn't happen btw
      return;
    }
    navigate(`flights/from/${departureAirport.codeIata}/to/${arrivalAirport.codeIata}`);
  }, [navigate, arrivalAirport, departureAirport]);

  return <PageSection>
    <div className="flex flex-col space-y-2">
      <Typography variant="h3">
        Search Flights
      </Typography>

      <div className="flex flex-col space-y-3">
        <AirportField
          label="Departing from"
          value={departureAirport}
          inputClassName="w-full"
          labelClassName="w-1/2 md:w-1/2 lg:w-2/3 min-w-fit"
          inputProps={{
            readOnly: true,
            onClick: () => departureDialog.setIsDialogOpen(true),
            placeholder: 'Select an airport...',
          }}
        />

        {/* TODO swap airports */}

        <AirportField
          label="Arriving to"
          value={arrivalAirport}
          inputClassName="w-full"
          labelClassName="w-1/2 md:w-1/2 lg:w-2/3 min-w-fit"
          inputProps={{
            readOnly: true,
            onClick: () => arrivalDialog.setIsDialogOpen(true),
            placeholder: 'Select an airport...',
          }}
        />

        <div className="flex justify-end">
          <Button
            variant="contained"
            color="info"
            disabled={!arrivalAirport || !departureAirport}
            className="w-fit fill-neutral hover:fill-white py-1"
            onClick={goToNextPage}
          >
            <Typography variant="h5">Search</Typography>
            <ChevronRightIcon className="h-4 fill-inherit w-fit" />
          </Button>
        </div>
      </div>

      <SelectAirportDialog
        onSelect={departureDialog.onSelect}
        search={departureDialog.search}
        setSearch={departureDialog.setSearch}
        options={availableAirports}
        selectedAirport={departureAirport}
        dialogProps={{
          open: departureDialog.isDialogOpen,
          title: 'Select departure airport',
          onClose: departureDialog.onCloseDialog,
        }}
      />
      <SelectAirportDialog
        onSelect={arrivalDialog.onSelect}
        search={arrivalDialog.search}
        setSearch={arrivalDialog.setSearch}
        options={availableAirports}
        selectedAirport={arrivalAirport}
        dialogProps={{
          open: arrivalDialog.isDialogOpen,
          title: 'Select arrival airport',
          onClose: arrivalDialog.onCloseDialog,
        }}
      />
    </div>
  </PageSection>;
}