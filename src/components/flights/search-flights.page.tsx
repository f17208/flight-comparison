import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AirportItem } from '../airports/airport-item';
import { Airport } from '../airports/airports.api';
import {
  airportsSelector,
  arrivalAirportSelector,
  departureAirportSelector,
  loadingSelector as airportsLoadingSelector,
  setArrivalAirport,
  setDepartureAirport,
} from '../airports/airports.slice';
import {
  loadingSelector as airlinesLoadingSelector,
} from '../airlines/airlines.slice';

import { SelectAirportDialog } from '../airports/select-airport';
import { useSelectAirportDialog } from '../airports/select-airport.hooks';
import { Button } from '../common/button/Button';
import { PageSection } from '../common/layout/PageSection';
import { Typography } from '../common/typography/Typography';
import { sagaActions as airportsSagaActions } from '../airports/airports.saga';
import { sagaActions as airlinesSagaActions } from '../airlines/airlines.saga';

export function SearchFlights() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allAirports = useSelector(airportsSelector);
  const allAirportsLoading = useSelector(airportsLoadingSelector);
  const allAirlinesLoading = useSelector(airlinesLoadingSelector);
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
    dispatch({ type: airportsSagaActions.FETCH_ALL_AIRPORTS });
    dispatch({ type: airlinesSagaActions.FETCH_ALL_AIRLINES });
  }, [dispatch]);

  const goToNextPage = useCallback(() => {
    if (!departureAirport || !arrivalAirport) {
      console.error('Missing arrival or departure airport'); // this shouldn't happen btw
      return;
    }
    navigate(`flights/from/${departureAirport.codeIata}/to/${arrivalAirport.codeIata}`);
  }, [navigate, arrivalAirport, departureAirport]);

  // eslint-disable-next-line
  const loading = allAirportsLoading || allAirlinesLoading;

  return <PageSection>
    <div className="flex flex-col space-y-2">
      <Typography variant="h3">
        Search Flights
      </Typography>

      <div
        className="
          flex flex-col sm:flex-row
          space-x-0 space-y-2 sm:space-x-4 sm:space-y-0
        "
      >
        <div>
          {
            departureAirport
              ? (
                <AirportItem
                  airport={departureAirport}
                  onClick={() => departureDialog.setIsDialogOpen(true)}
                />
              )
              : (
                <Button
                  variant="outlined"
                  className="h-10"
                  onClick={() => departureDialog.setIsDialogOpen(true)}
                >
                  Where do you depart from?
                </Button>
              )
          }
        </div>
        <div>
          {
            arrivalAirport
              ? (
                <AirportItem
                  airport={arrivalAirport}
                  onClick={() => arrivalDialog.setIsDialogOpen(true)}
                />
              )
              : (
                <Button
                  variant="outlined"
                  className="h-10"
                  onClick={() => arrivalDialog.setIsDialogOpen(true)}
                >
                  Where are you going?
                </Button>
              )
          }
        </div>
        <SelectAirportDialog
          onSelect={departureDialog.onSelect}
          search={departureDialog.search}
          setSearch={departureDialog.setSearch}
          options={allAirports}
          selectedAirport={departureAirport}
          dialogProps={{
            open: departureDialog.isDialogOpen,
            title: 'Select departure airport', // TODO i18n
            onClose: departureDialog.onCloseDialog,
          }}
        />
        <SelectAirportDialog
          onSelect={arrivalDialog.onSelect}
          search={arrivalDialog.search}
          setSearch={arrivalDialog.setSearch}
          options={allAirports}
          selectedAirport={arrivalAirport}
          dialogProps={{
            open: arrivalDialog.isDialogOpen,
            title: 'Select arrival airport', // TODO i18n
            onClose: arrivalDialog.onCloseDialog,
          }}
        />

        <Button
          variant="contained"
          color="info"
          disabled={!arrivalAirport || !departureAirport}
          onClick={goToNextPage}
        >
          See flights
        </Button>
      </div>
    </div>
  </PageSection>;
}
