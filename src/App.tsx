import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'react-use';

import { Navbar } from './components/common/navbar/navbar';

import { Airports } from './components/airports/airports.page';
import { Airlines } from './components/airlines/airlines.page';
import { SearchFlights } from './components/flights/search-flights.page';
import { SelectAirportsPage } from './components/airports/select-airports.page';
import { Airport } from './components/airports/airport.page';
import { Airline } from './components/airlines/airline.page';
import { Loader } from './components/common/loader/loader';

import { sagaActions as airportsSaga } from './components/airports/airports.saga';
import { sagaActions as airlinesSaga } from './components/airlines/airlines.saga';
import { sagaActions as flightsSaga } from './components/flights/flights.saga';
import { loadingSelector as airportsLoadingSelector } from './components/airports/airports.slice';
import { loadingSelector as airlinesLoadingSelector } from './components/airlines/airlines.slice';
import { loadingAllSelector } from './components/flights/flights.slice';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const airportsLoading = useSelector(airportsLoadingSelector);
  const flightsLoading = useSelector(loadingAllSelector);
  const airlinesLoading = useSelector(airlinesLoadingSelector);

  // we're using debounce to avoid duplicate requests whenever deps change
  useDebounce(
    () => {
      dispatch({ type: airportsSaga.FETCH_ALL_AIRPORTS });
      dispatch({ type: airlinesSaga.FETCH_ALL_AIRLINES });
      dispatch({ type: flightsSaga.FETCH_ALL_FLIGHTS });
    },
    100,
    [],
  );

  const loading = airportsLoading || airlinesLoading || flightsLoading;

  return (
    <div className="h-full">
      <Navbar />
      {
        loading
          ? <Loader />
          : (
            <Routes>
              <Route path="/" element={<SelectAirportsPage />} />
              <Route path="/flights/from/:departureCode/to/:arrivalCode" element={<SearchFlights />} />

              <Route path="/airports" element={<Airports />} />
              <Route path="/airports/:airportId" element={<Airport />} />

              <Route path="/airlines" element={<Airlines />} />
              <Route path="/airlines/:airlineId" element={<Airline />} />
            </Routes>
          )
      }
    </div>
  );
}

export default App;
