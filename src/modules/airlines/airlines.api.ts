import { client } from '../../utils/api';

export function getAirlines() {
  return client.get('/airlines/all')
    .then(({ data: { data } }) => ({ data }))
    .catch(error => ({ error }));
}
