import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import { sagaActions } from './airports.saga';

import { Typography } from '../common/typography/Typography';
import { PageSection } from '../common/layout/PageSection';
import { airportsSelector } from './airports.slice';
import { DEFAULT_MAP_ZOOM } from '../../utils/constants';
import { MarkerIcon } from '../common/icons';

export function Airport() {
  const dispatch = useDispatch();
  const airports = useSelector(airportsSelector);
  const { airportId } = useParams();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_ALL_AIRPORTS });
  }, [dispatch]);

  const airport = useMemo(() => {
    return airports.find(a => a.id.toString() === airportId);
  }, [airports, airportId]);

  const airportCoordinates: LatLngExpression = [
    +(airport?.latitude || 0),
    +(airport?.longitude || 0),
  ];

  if (!airport) { // TODO error
    return (
      <div>
        Error...
      </div>
    );
  }

  return <PageSection className="p-8">
    <div>
      <Typography variant="h3" className="text-neutral">
        {airport?.codeIata}
      </Typography>

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
            <p>{`(${airportCoordinates.join(', ')})`}</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  </PageSection>;
}
