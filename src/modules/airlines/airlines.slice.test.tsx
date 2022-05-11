import { call, put } from '@redux-saga/core/effects';
import { Airline } from './airlines.types';
import { getAirlines } from './airlines.api';
import { fetchAllAirlinesSaga } from './airlines.saga';
import { setAirlines, setLoading } from './airlines.slice';

describe('Fetch all airlines', () => {
  it('saga flow should be correct', () => {
    const gen = fetchAllAirlinesSaga();

    const mockedAirlines: Airline[] = [
      {
        id: 1,
        codeIataPrefix: '200',
        name: 'Test',
        logoFilename: '',
      },
    ];

    const mockedResponse = {
      data: mockedAirlines,
    };

    expect(gen.next()).toEqual({
      value: put(setLoading(true)),
      done: false,
    });

    expect(gen.next(mockedResponse)).toEqual({
      value: call(getAirlines),
      done: false,
    });

    expect(gen.next(mockedResponse)).toEqual({
      value: put(setAirlines(mockedAirlines)),
      done: false,
    });

    expect(gen.next()).toEqual({
      value: put(setLoading(false)),
      done: false,
    });

    expect(gen.next().done).toEqual(true);
  });
});