import { useState } from 'react';
import { Airport } from './airports.api';

export const useSelectAirportDialog = (
  selectedAirport: Airport | null,
  setSelectedAirport: (airport: Airport | null) => void,
) => {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return {
    isDialogOpen,
    setIsDialogOpen,
    selectedAirport,
    setSelectedAirport,
    search,
    setSearch,
  };
};
