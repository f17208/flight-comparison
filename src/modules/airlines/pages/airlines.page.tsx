import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { airlinesSelector } from '../store';
import { AirlineItem } from '../components';

import { Typography } from '../../common/typography';
import { PageSection } from '../../common/page-section';

export function Airlines() {
  const airlines = useSelector(airlinesSelector);
  const { t } = useTranslation();

  return <PageSection className="p-8">
    <div>
      <Typography className="text-neutral" variant="h3">
        {t('airlines')}
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
