import { call, put } from '@redux-saga/core/effects';
import { getFlights, getSearchFlights } from './flights.api';
import { fetchAllFlightsSaga, fetchSearchFlightsSaga } from './flights.saga';
import { setAllFlights, setAllFlightsLoading, setFlights, setLoading } from './flights.slice';
import { Flight } from './flights.types';

describe('Fetch all flights', () => {
  it('saga flow should be correct', () => {
    const gen = fetchAllFlightsSaga();

    const mockedFlights: Flight[] = [
      {
        id: 1,
        arrivalAirportId: 1,
        departureAirportId: 2,
        price: 100.00,
        airlineId: 2,
      },
    ];

    const mockedResponse = {
      data: mockedFlights,
    };

    expect(gen.next()).toEqual({
      value: put(setAllFlightsLoading(true)),
      done: false,
    });

    expect(gen.next(mockedResponse)).toEqual({
      value: call(getFlights),
      done: false,
    });

    expect(gen.next(mockedResponse)).toEqual({
      value: put(setAllFlights(mockedFlights)),
      done: false,
    });

    expect(gen.next()).toEqual({
      value: put(setAllFlightsLoading(false)),
      done: false,
    });

    expect(gen.next().done).toEqual(true);
  });
});


describe('Fetch search flights', () => {
  it('saga flow should be correct', () => {
    const departureCode = "PSA";
    const arrivalCode = "MXP";
    const gen = fetchSearchFlightsSaga({ payload: { departureCode, arrivalCode } });

    const mockedFlights: Flight[] = [
      {
        id: 1,
        arrivalAirportId: 1,
        departureAirportId: 2,
        price: 100.00,
        airlineId: 2,
      },
    ];

    const mockedResponse = {
      data: mockedFlights,
    };

    expect(gen.next()).toEqual({
      value: put(setLoading(true)),
      done: false,
    });

    expect(gen.next(mockedResponse)).toEqual({
      value: call(getSearchFlights, departureCode, arrivalCode),
      done: false,
    });

    expect(gen.next(mockedResponse)).toEqual({
      value: put(setFlights(mockedFlights)),
      done: false,
    });

    expect(gen.next()).toEqual({
      value: put(setLoading(false)),
      done: false,
    });

    expect(gen.next().done).toEqual(true);
  });
});
