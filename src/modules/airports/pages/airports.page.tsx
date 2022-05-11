import { MapContainer, useMap, Marker, Popup, Rectangle, TileLayer } from 'react-leaflet';
import { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  LatLngTuple,
  polyline as LeafletPolyline,
  LatLng as LeafletLatLng,
} from 'leaflet';

import { useSelector } from 'react-redux';

import { Link } from '../../common/link';
import { Typography } from '../../common/typography';
import { PageSection } from '../../common/page-section';
import { airportsSelector } from '../store';

import { DEBUG_MAP, ENABLE_MAP_SCROLL_ZOOM } from '../../../utils/constants';
import { MarkerIcon } from '../../common/icons';
import { AirportDetails } from '../components';

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
  const { t } = useTranslation();

  const coordsToBound = useMemo(() => {
    if (airports.length === 0) {
      return [
        [0, 0],
        [0, 0],
      ] as LatLngTuple[];
    }

    let rightMost: number = +airports[0].latitude;
    let leftMost: number = +airports[0].latitude;
    let topMost: number = +airports[0].longitude;
    let bottomMost: number = +airports[0].longitude;

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
        {t('airports')}
      </Typography>

      <Typography variant="subtitle2" className="pb-4">
        {t('airports-page-hint')}
      </Typography>

      <MapContainer
        style={{ width: '100%', height: '60vh' }}
        center={mapCenter}
        scrollWheelZoom={ENABLE_MAP_SCROLL_ZOOM}
      >
        <BoundCoords coords={coordsToBound} debug={DEBUG_MAP} />
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
