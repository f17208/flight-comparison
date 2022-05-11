import { MapContainer, useMap, Marker, Popup, Rectangle, TileLayer } from 'react-leaflet';
import { FC, useEffect, useMemo } from 'react';
import {
  LatLngTuple,
  polyline as LeafletPolyline,
  LatLng as LeafletLatLng,
} from 'leaflet';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography } from '../common/typography/Typography';
import { PageSection } from '../common/layout/PageSection';
import { airportsSelector } from './airports.slice';

import { DEFAULT_MAP_ZOOM } from '../../utils/constants';
import { MarkerIcon } from '../common/icons';
import { AirportDetails } from './airport-details';

interface BoundCoordsProps {
  coords: LatLngTuple[];
  debug?: boolean;
}

const BoundCoords: FC<BoundCoordsProps> = ({ coords: polyline, debug }) => {
  const map = useMap();

  useEffect(() => {
    if (polyline.length < 2) return;

    const latLngCoords = polyline.map(
      coords => new LeafletLatLng(...coords),
    );

    const polylineObj = LeafletPolyline(
      latLngCoords,
      {
        color: 'blue',
        weight: 3,
        opacity: debug ? 1 : 0,
        lineJoin: 'round',
      },
    );

    polylineObj.addTo(map);
    try {
      map.fitBounds(polylineObj.getBounds());
    } catch (e) {
      console.error(e);
    }
  }, [map, polyline]);

  if (polyline.length < 2) {
    return null;
  }

  return (
    <Rectangle
      bounds={polyline}
      pathOptions={{
        color: debug ? 'red' : 'transparent',
      }}
    />
  );
};

export function Airports() {
  const airports = useSelector(airportsSelector);

  const coordsToBound = useMemo(() => {
    let rightMost: number = 0;
    let topMost: number = 0;
    let bottomMost: number = 0;
    let leftMost: number = 0;

    airports.forEach(airport => {
      const lat = +airport.latitude;
      const lng = +airport.longitude;

      if (lat < leftMost) {
        leftMost = lat;
      }
      if (lat > rightMost) {
        rightMost = lat;
      }
      if (lng > topMost) {
        topMost = lng;
      }
      if (lng < bottomMost) {
        bottomMost = lng;
      }
    });

    return [
      [rightMost, topMost],
      [leftMost, bottomMost],
    ] as LatLngTuple[];
  }, [airports]);

  const mapCenter = useMemo(() => {
    const [
      [rightMost, topMost],
      [leftMost, bottomMost],
    ] = coordsToBound;

    return [
      (rightMost + leftMost) / 2,
      (topMost + bottomMost) / 2,
    ] as LatLngTuple;
  }, [coordsToBound]);

  return <PageSection className="p-8">
    <div>
      <Typography variant="h3" className="text-neutral">
        Airports
      </Typography>

      <MapContainer
        style={{ width: '100%', height: '40vh' }}
        center={mapCenter}
        zoom={DEFAULT_MAP_ZOOM}
      >
        <BoundCoords coords={coordsToBound} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          airports.flatMap((airport) => {
            const coords: LatLngTuple = [
              +airport.latitude,
              +airport.longitude,
            ];

            return (
              <Marker
                key={airport.id}
                position={coords}
                icon={MarkerIcon}
              >
                <Popup>
                  <Link to={`/airports/${airport.id}`}>
                    <strong>{airport?.codeIata}</strong>
                  </Link>
                  {airport && (
                    <AirportDetails airport={airport} />
                  )}
                </Popup>
              </Marker>
            );
          })
        }
      </MapContainer>
    </div>
  </PageSection>;
}
