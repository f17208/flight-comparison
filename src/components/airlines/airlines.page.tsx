import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sagaActions } from './airlines.saga';

import { Typography } from '../common/typography/Typography';
import { PageSection } from '../common/layout/PageSection';
import { airlinesSelector } from './airlines.slice';
import { AirlineItem } from './airline-item';

export function Airlines() {
  const dispatch = useDispatch();
  const airlines = useSelector(airlinesSelector);

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_ALL_AIRLINES });
  }, [dispatch]);

  return <PageSection className="p-8">
    <div>
      <Typography variant="h3">
        Airlines
      </Typography>
      <ul>
        {
          airlines.map((airline) => (
            <li key={airline.id}>
              <AirlineItem airline={airline} />
            </li>
          ))
        }
      </ul>
    </div>
  </PageSection>;
}
