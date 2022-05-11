import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Airport } from '../types';
import {
  airportsSelector,
  arrivalAirportSelector,
  departureAirportSelector,
  setArrivalAirport,
  setDepartureAirport,
  swapDepartureAndArrivalAirports,
} from '../store';

import { SelectAirportDialog, AirportField } from '../components';
import { useSelectAirportDialog } from '../hooks';

import { Button } from '../../common/button';
import { PageSection } from '../../common/page-section';
import { Typography } from '../../common/typography';
import { ChevronRightIcon, SwapIcon } from '../../common/icons';

export function SelectAirportsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  return <PageSection className="max-w-xl">
    <div className="flex flex-col space-y-2">
      <Typography variant="h3">
        {t('search-flights')}
      </Typography>

      <div className="flex flex-col space-y-3">
        <AirportField
          label={t('departing-from')}
          value={departureAirport}
          inputClassName="w-full"
          labelClassName="w-1/2 md:w-1/2 lg:w-2/3 min-w-fit"
          inputProps={{
            readOnly: true,
            onClick: () => departureDialog.setIsDialogOpen(true),
            placeholder: t('select-airport'),
          }}
        />

        <AirportField
          label={t('arriving-to')}
          value={arrivalAirport}
          inputClassName="w-full"
          labelClassName="w-1/2 md:w-1/2 lg:w-2/3 min-w-fit"
          inputProps={{
            readOnly: true,
            onClick: () => arrivalDialog.setIsDialogOpen(true),
            placeholder: t('select-airport'),
          }}
        />

        <div className="flex justify-end space-x-4">
          <Button
            variant="outlined"
            onClick={() => dispatch(swapDepartureAndArrivalAirports())}
            disabled={!arrivalAirport && !departureAirport}
          >
            <Typography variant="h5">{t('swap')}</Typography>
            <SwapIcon className="h-4 fill-inherit text-inherit w-fit" />
          </Button>

          <Button
            variant="contained"
            color="info"
            disabled={!arrivalAirport || !departureAirport}
            className="w-fit py-1"
            onClick={goToNextPage}
          >
            <Typography variant="h5">{t('search')}</Typography>
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
          title: t('select-departure-airport'),
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
          title: t('select-arrival-airport'),
          onClose: arrivalDialog.onCloseDialog,
        }}
      />
    </div>
  </PageSection>;
}
