import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography } from '../common/typography/Typography';
import { PageSection } from '../common/layout/PageSection';
import { airportsSelector } from './airports.slice';
import { AirportItem } from './airport-item';

export function Airports() {
  const airports = useSelector(airportsSelector);

  // TODO handle loading
  return <PageSection className="p-8">
    <div>
      <Typography variant="h3" className="text-neutral">
        Airports
      </Typography>
      <ul>
        {
          airports.map((airport) => (
            <li key={airport.id}>
              <Link to={`/airports/${airport.id}`}>
                <AirportItem airport={airport} className="my-1" />
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  </PageSection>;
}
