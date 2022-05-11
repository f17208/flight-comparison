import { client } from '../../../utils/api';

export function getAirports() {
  return client.get('/airports/all')
    .then(({ data: { data } }) => ({ data }))
    .catch(error => ({ error }));
}
