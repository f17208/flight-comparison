import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography } from '../../common/typography/typography';
import { PageSection } from '../../common/layout/page-section';
import { airlinesSelector } from '../store/airlines.slice';
import { AirlineItem } from '../components/airline-item';

export function Airlines() {
  const airlines = useSelector(airlinesSelector);

  return <PageSection className="p-8">
    <div>
      <Typography className="text-neutral" variant="h3">
        Airlines
      </Typography>
      <ul>
        {
          airlines.map((airline) => (
            <li key={airline.id}>
              <Link to={`/airlines/${airline.id}`}>
                <AirlineItem airline={airline} className="my-1" />
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  </PageSection>;
}
