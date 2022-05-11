import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'react-use';

import { Navbar } from './modules/common/navbar/navbar';

import { Airports } from './modules/airports/airports.page';
import { Airlines } from './modules/airlines/airlines.page';
import { SearchFlights } from './modules/flights/search-flights.page';
import { SelectAirportsPage } from './modules/airports/select-airports.page';
import { Airport } from './modules/airports/airport.page';
import { Airline } from './modules/airlines/airline.page';
import { Loader } from './modules/common/loader/loader';

import { sagaActions as airportsSaga } from './modules/airports/airports.saga';
import { sagaActions as airlinesSaga } from './modules/airlines/airlines.saga';
import { sagaActions as flightsSaga } from './modules/flights/flights.saga';
import { loadingSelector as airportsLoadingSelector } from './modules/airports/airports.slice';
import { loadingSelector as airlinesLoadingSelector } from './modules/airlines/airlines.slice';
import { loadingAllSelector } from './modules/flights/flights.slice';

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

  const loading = airportsLoading
    || airlinesLoading
    || flightsLoading;

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
