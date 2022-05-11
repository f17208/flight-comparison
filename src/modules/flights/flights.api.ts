import { client } from '../../utils/api';

export function getFlights() {
  return client.get('/flights/all')
    .then(({ data: { data } }) => ({ data }))
    .catch(error => ({ error }));
}

export function getSearchFlights(departureCode: string, arrivalCode: string) {
  return client.get(`/flights/from/${departureCode}/to/${arrivalCode}`)
    .then(({ data: { data } }) => ({ data }))
    .catch(error => ({ error }));
}
