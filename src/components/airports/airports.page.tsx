import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { sagaActions } from './airports.saga';

import { Typography } from '../common/typography/Typography';
import { PageSection } from '../common/layout/PageSection';
import { airportsSelector } from './airports.slice';
import { AirportItem } from './airport-item';

export function Airports() {
  const dispatch = useDispatch();
  const airports = useSelector(airportsSelector);

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_ALL_AIRPORTS });
  }, [dispatch]);

  // TODO handle loading
  return <PageSection className="p-8">
    <div>
      <Typography variant="h3">
        Airports
      </Typography>
      <ul>
        {
          airports.map((airport) => (
            <li key={airport.id}>
              <Link to={`/airport/${airport.id}`}>
                <AirportItem airport={airport} className="my-1" />
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  </PageSection>;
}
