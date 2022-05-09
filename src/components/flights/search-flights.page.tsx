import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AirportItem } from '../airports/airport-item';
import { Airport } from '../airports/airports.api';
import {
  airportsSelector,
  arrivalAirportSelector,
  departureAirportSelector,
  setArrivalAirport,
  setDepartureAirport,
} from '../airports/airports.slice';
import { SelectAirportDialog } from '../airports/select-airport';
import { useSelectAirportDialog } from '../airports/select-airport.hooks';
import { Button } from '../common/button/Button';
import { PageSection } from '../common/layout/PageSection';
import { Typography } from '../common/typography/Typography';
import { sagaActions } from './flights.saga';

export function SearchFlights() {
  const dispatch = useDispatch();

  const allAirports = useSelector(airportsSelector);
  const departureAirport = useSelector(departureAirportSelector);
  const arrivalAirport = useSelector(arrivalAirportSelector);

  const onSetDepartureAirport = useCallback((airport: Airport | null) => {
    dispatch(setDepartureAirport(airport));
  }, [dispatch]);

  const onSetArrivalAirport = useCallback((airport: Airport | null) => {
    dispatch(setArrivalAirport(airport));
  }, [dispatch]);

  const departureDialog = useSelectAirportDialog(departureAirport, onSetDepartureAirport);
  const arrivalDialog = useSelectAirportDialog(arrivalAirport, onSetArrivalAirport);

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_ALL_FLIGHTS });
  }, [dispatch]);

  return <PageSection>
    <div className="flex flex-col space-y-2">
      <Typography variant="h3">
        Search Flights
      </Typography>

      <div className="flex space-x-4">
        <div>
          {
            departureAirport
              ? <AirportItem airport={departureAirport} />
              : <Button onClick={() => departureDialog.setIsDialogOpen(true)}>
                Da dove parti?
              </Button>
          }
        </div>
        <div>
          {
            arrivalAirport
              ? <AirportItem airport={arrivalAirport} />
              : <Button onClick={() => arrivalDialog.setIsDialogOpen(true)}>
                Dove vai?
              </Button>
          }
        </div>
        <SelectAirportDialog
          onSelect={departureDialog.setSelectedAirport}
          search={departureDialog.search}
          setSearch={departureDialog.setSearch}
          options={allAirports}
          selectedAirport={departureAirport}
          dialogProps={{
            title: 'Departure Airport', // TODO i18n
            onClose: () => departureDialog.setIsDialogOpen(false),
          }}
        />
        <SelectAirportDialog
          onSelect={arrivalDialog.setSelectedAirport}
          search={arrivalDialog.search}
          setSearch={arrivalDialog.setSearch}
          options={allAirports}
          selectedAirport={arrivalAirport}
          dialogProps={{
            title: 'Arrival Airport', // TODO i18n
            onClose: () => arrivalDialog.setIsDialogOpen(false),
          }}
        />
      </div>
    </div>
  </PageSection>;
}
