import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'react-use';

import { Navbar } from './modules/common/navbar';
import { Loader } from './modules/common/loader';

import { Airports } from './modules/airports/pages/airports.page';
import { Airlines } from './modules/airlines/pages/airlines.page';
import { SearchFlights } from './modules/flights/pages/search-flights.page';
import { SelectAirportsPage } from './modules/airports/pages/select-airports.page';
import { Airport } from './modules/airports/pages/airport.page';
import { Airline } from './modules/airlines/pages/airline.page';

import { sagaActions as airportsSaga } from './modules/airports/store/airports.saga';
import { sagaActions as airlinesSaga } from './modules/airlines/store/airlines.saga';
import { sagaActions as flightsSaga } from './modules/flights/store/flights.saga';
import { loadingSelector as airportsLoadingSelector } from './modules/airports/store/airports.slice';
import { loadingSelector as airlinesLoadingSelector } from './modules/airlines/store/airlines.slice';
import { loadingAllSelector } from './modules/flights/store/flights.slice';

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
