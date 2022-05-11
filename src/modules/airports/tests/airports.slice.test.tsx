import { call, put } from '@redux-saga/core/effects';
import { getAirports } from '../api/airports.api';
import { fetchAllAirportsSaga } from '../store/airports.saga';
import { setAirports, setLoading } from '../store/airports.slice';
import { Airport } from '../types/airports.types';

describe('Fetch all airports', () => {
  it('saga flow should be correct', () => {
    const gen = fetchAllAirportsSaga();

    const mockedAirports: Airport[] = [
      {
        id: 1,
        codeIata: 'PSA',
        latitude: '43.6931',
        longitude: '10.3789',
      },
    ];

    const mockedResponse = {
      data: mockedAirports,
    };

    expect(gen.next()).toEqual({
      value: put(setLoading(true)),
      done: false,
    });

    expect(gen.next(mockedResponse)).toEqual({
      value: call(getAirports),
      done: false,
    });

    expect(gen.next(mockedResponse)).toEqual({
      value: put(setAirports(mockedAirports)),
      done: false,
    });

    expect(gen.next()).toEqual({
      value: put(setLoading(false)),
      done: false,
    });

    expect(gen.next().done).toEqual(true);
  });
});
