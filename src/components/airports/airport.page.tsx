import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import { Typography } from '../common/typography/Typography';
import { PageSection } from '../common/layout/PageSection';
import { airportsSelector } from './airports.slice';
import { DEFAULT_MAP_ZOOM } from '../../utils/constants';
import { MarkerIcon } from '../common/icons';
import { AirportDetails } from './airport-details';
import { FlightItem } from '../flights/flight-item';
import { airlinesSelector } from '../airlines/airlines.slice';
import { allFlightsSelector } from '../flights/flights.slice';
import { enrighFlightWithDetails } from '../../utils/flights';
import { FlightPathItem } from '../flights/flights.types';

export function Airport() {
  const airlines = useSelector(airlinesSelector);
  const airports = useSelector(airportsSelector);
  const flights = useSelector(allFlightsSelector);

  const { airportId } = useParams();

  const airport = useMemo(() => {
    return airports.find(a => a.id.toString() === airportId);
  }, [airports, airportId]);

  const airportCoordinates: LatLngExpression = [
    +(airport?.latitude || 0),
    +(airport?.longitude || 0),
  ];

  const airportFullFlightsDeparting = useMemo(() => {
    return flights.filter(f => f.departureAirportId.toString() === airportId)
      .map(f => enrighFlightWithDetails(f, airlines, airports))
      .filter(Boolean) as FlightPathItem[];
  }, [airportId, airlines, airports, flights]);

  const airportFullFlightsArriving = useMemo(() => {
    return flights.filter(f => f.arrivalAirportId.toString() === airportId)
      .map(f => enrighFlightWithDetails(f, airlines, airports))
      .filter(Boolean) as FlightPathItem[];
  }, [airportId, airlines, airports, flights]);

  return <PageSection className="p-8">
    <div>
      <Typography variant="h3" className="text-neutral">
        {airport?.codeIata}
      </Typography>

      {airport && (
        <AirportDetails airport={airport} className="mb-4" />
      )}

      <div className="mb-8">
        <MapContainer
          style={{ width: '100%', height: '60vh' }}
          center={airportCoordinates}
          zoom={DEFAULT_MAP_ZOOM}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={airportCoordinates}
            icon={MarkerIcon}
          >
            <Popup>
              <strong>{airport?.codeIata}</strong>
              {airport && (
                <AirportDetails airport={airport} />
              )}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="flex flex-col sm:flex-row space-x-8 sm:justify-evenly">
        <div>
          <Typography variant="h4" className="mt-3 text-neutral">
            Flights departing
          </Typography>
          {
            airportFullFlightsDeparting.map(flight => {
              return <FlightItem key={flight.id} flight={flight} divider />;
            })
          }
        </div>

        <div>
          <Typography variant="h4" className="mt-3 text-neutral">
            Flights arriving
          </Typography>
          {
            airportFullFlightsArriving.map(flight => {
              return <FlightItem key={flight.id} flight={flight} divider />;
            })
          }
        </div>
      </div>

    </div>
  </PageSection>;
}
