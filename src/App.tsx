import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/common/navbar/navbar';

import { Airports } from './components/airports/airports.page';
import { Airlines } from './components/airlines/airlines.page';
import { SearchFlights } from './components/flights/search-flights.page';
import { SelectAirportsPage } from './components/airports/select-airports.page';
import { Airport } from './components/airports/airport.page';
import { Airline } from './components/airlines/airline.page';
import { Loader } from './components/common/loader/loader';

function App() {
  return (
    <Loader />
  );

  return (
    <div className="h-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<SelectAirportsPage />} />
        <Route path="/flights/from/:departureCode/to/:arrivalCode" element={<SearchFlights />} />

        <Route path="/airports" element={<Airports />} />
        <Route path="/airports/:airportId" element={<Airport />} />

        <Route path="/airlines" element={<Airlines />} />
        <Route path="/airlines/:airlineId" element={<Airline />} />
      </Routes>
    </div>
  );
}

export default App;
