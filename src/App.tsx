import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/common/navbar/navbar';

import { Airports } from './components/pages/airports/airports';
import { SearchFlights } from './components/pages/flights/search-flights';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchFlights />} />
        <Route path="airports" element={<Airports />} />
      </Routes>
    </div>
  );
}

export default App;
