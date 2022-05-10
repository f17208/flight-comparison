import { FC, useEffect, useMemo } from 'react';
import {
  LatLngTuple,
  polyline as LeafletPolyline,
  LatLng as LeafletLatLng,
} from 'leaflet';
import {
  MapContainer,
  MapContainerProps,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  useMap,
} from 'react-leaflet';
import { Link } from 'react-router-dom';

import { MarkerIcon } from '../common/icons';
import { FlightPathItem } from './flights.types';
import { DEBUG_MAP } from '../../utils/constants';

interface BoundPolylineProps {
  polyline: LatLngTuple[];
  debug?: boolean;
}

const BoundPolyline: FC<BoundPolylineProps> = ({ polyline, debug }) => {
  const map = useMap();

  useEffect(() => {
    if (polyline.length < 2) return;

    const latLngCoords = polyline.map(
      coords => new LeafletLatLng(...coords),
    );

    const polylineObj = LeafletPolyline(
      latLngCoords,
      {
        color: '#FF0E96',
        weight: 3,
        opacity: 0.8,
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

export interface FlightPathMapProps extends MapContainerProps {
  path: FlightPathItem[];
}

export const FlightPathMap: FC<FlightPathMapProps> = ({
  path,
}) => {
  const departureAirport = useMemo(() => {
    if (path.length === 0) return null;
    return path[0].departureAirport;
  }, [path]);

  const arrivalAirport = useMemo(() => {
    if (path.length === 0) return null;
    return path[path.length - 1].arrivalAirport;
  }, [path]);

  const mapCenter: LatLngTuple = useMemo(() => {
    const depLat = +(departureAirport?.latitude || 0);
    const depLng = +(departureAirport?.longitude || 0);
    const arrLat = +(arrivalAirport?.latitude || 0);
    const arrLng = +(arrivalAirport?.longitude || 0);

    return [
      (depLat + arrLat) / 2,
      (depLng + arrLng) / 2,
    ];
  }, [departureAirport, arrivalAirport]);

  const polyline: LatLngTuple[] = path.flatMap((flight, i) => {
    const toReturn = [
      [
        +flight.departureAirport.latitude,
        +flight.departureAirport.longitude,
      ] as LatLngTuple,
    ];
    if (i === path.length - 1) {
      toReturn.push([
        +flight.arrivalAirport.latitude,
        +flight.arrivalAirport.longitude,
      ] as LatLngTuple);
    }
    return toReturn;
  });

  return (
    <MapContainer
      style={{ width: '100%', height: '40vh' }}
      center={mapCenter}
      scrollWheelZoom={false}
      zoom={11}
    >
      <BoundPolyline polyline={polyline} debug={DEBUG_MAP} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        path.flatMap((flight, i) => {
          const departureCoordinates: LatLngTuple = [
            +flight.departureAirport.latitude,
            +flight.departureAirport.longitude,
          ];

          const arrivalCoordinates: LatLngTuple = [
            +flight.arrivalAirport.latitude,
            +flight.arrivalAirport.longitude,
          ];
          const toRender = [
            <Marker
              key={flight.departureAirport.id}
              position={departureCoordinates}
              icon={MarkerIcon}
            >
              <Popup>
                <Link to={`/airports/${flight.departureAirportId}`}>
                  <strong>{flight.departureAirport?.codeIata}</strong>
                </Link>
              </Popup>
            </Marker>,
          ];

          if (i === path.length - 1) {
            toRender.push(
              <Marker
                key={flight.arrivalAirport.id}
                position={arrivalCoordinates}
                icon={MarkerIcon}
              >
                <Popup>
                  <Link to={`/airports/${flight.arrivalAirportId}`}>
                    <strong>{flight.arrivalAirport?.codeIata}</strong>
                  </Link>
                </Popup>
              </Marker>,
            );
          }
          return toRender;
        })
      }
    </MapContainer>
  );
};
