import { useCallback, useState } from 'react';
import { Airport } from './airports.types';

export const useSelectAirportDialog = (
  selectedAirport: Airport | null,
  setSelectedAirport: (airport: Airport | null) => void,
) => {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // some helper functions just to reduce the amount of repeated code elsewhere
  const onCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, [setIsDialogOpen]);

  const onSelect = useCallback((airport: Airport | null, closeOnSelect = true) => {
    setSelectedAirport(airport);
    if (closeOnSelect) onCloseDialog();
  }, [setSelectedAirport, onCloseDialog]);

  return {
    isDialogOpen,
    setIsDialogOpen,
    onCloseDialog,
    onSelect,
    selectedAirport,
    setSelectedAirport,
    search,
    setSearch,
  };
};
