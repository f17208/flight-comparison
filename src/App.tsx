import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/common/navbar/navbar';

import { Airports } from './components/airports/airports.page';
import { Airlines } from './components/airlines/airlines.page';
import { SearchFlights } from './components/flights/search-flights.page';
import { SelectAirportsPage } from './components/airports/select-airports.page';

function App() {
  return (
    <div className="h-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<SelectAirportsPage />} />
        <Route path="/flights/from/:departureCode/to/:arrivalCode" element={<SearchFlights />} />
        <Route path="airports" element={<Airports />} />
        <Route path="airlines" element={<Airlines />} />
      </Routes>
    </div>
  );
}

export default App;
