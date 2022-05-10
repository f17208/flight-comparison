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

export function Airport() {
  const airports = useSelector(airportsSelector);
  const { airportId } = useParams();

  const airport = useMemo(() => {
    return airports.find(a => a.id.toString() === airportId);
  }, [airports, airportId]);

  const airportCoordinates: LatLngExpression = [
    +(airport?.latitude || 0),
    +(airport?.longitude || 0),
  ];

  return <PageSection className="p-8">
    <div>
      <Typography variant="h3" className="text-neutral">
        {airport?.codeIata}
      </Typography>

      {airport && (
        <AirportDetails airport={airport} className="mb-4" />
      )}

      <MapContainer
        style={{ width: '100%', height: '60vh' }}
        center={airportCoordinates}
        zoom={DEFAULT_MAP_ZOOM}
        scrollWheelZoom
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
  </PageSection>;
}
