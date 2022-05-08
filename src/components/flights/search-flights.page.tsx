import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sagaActions } from './flights.saga';

export function SearchFlights() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_ALL_FLIGHTS });
  }, [dispatch]);

  return <div>
    Search Flights
  </div>;
}
