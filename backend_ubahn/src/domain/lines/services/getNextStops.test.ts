import { getNextStops } from './getNextStops';
import { Direction } from '../enums/Direction';
import { LineType } from '../enums/LineType';
import { Line } from '../models/Line';

describe('linear line', () => {
  const linearLine: Line = {
    name: 'dummy',
    color: '#ff0000',
    type: LineType.Linear,
    stations: ['Station1', 'Station2', 'Station3', 'Station4', 'Station5'],
  };

  it(`returns the next 3 stops if passed 3`, () => {
    const nextStops = getNextStops(
      linearLine,
      Direction.Forward,
      'Station2',
      3,
    );
    expect(nextStops).toStrictEqual(['Station3', 'Station4', 'Station5']);
  });

  it(`returns the next 2 stops if passed 2`, () => {
    const nextStops = getNextStops(
      linearLine,
      Direction.Forward,
      'Station2',
      2,
    );
    expect(nextStops).toStrictEqual(['Station3', 'Station4']);
  });

  it(`returns the last 2 stops if invoked at end of array`, () => {
    const nextStops = getNextStops(
      linearLine,
      Direction.Forward,
      'Station3',
      3,
    );
    expect(nextStops).toStrictEqual(['Station4', 'Station5']);
  });

  it(`returns the previous 3 stops if invoked with backward direction`, () => {
    const nextStops = getNextStops(
      linearLine,
      Direction.Backward,
      'Station5',
      3,
    );
    expect(nextStops).toStrictEqual(['Station4', 'Station3', 'Station2']);
  });

  it(`throws if requested station is not found`, () => {
    const act = () =>
      getNextStops(linearLine, Direction.Forward, 'StationX', 3);
    expect(act).toThrowError();
  });
});

// ignore these for now - we'll talk about it in the interview
xdescribe('cyclic line', () => {
  const cyclicLine: Line = {
    name: 'dummy',
    color: '#ff0000',
    type: LineType.Cyclic,
    stations: ['Station1', 'Station2', 'Station3', 'Station4', 'Station5'],
  };

  it(`continues with starting station if end is reached`, () => {
    const nextStops = getNextStops(
      cyclicLine,
      Direction.Forward,
      'Station4',
      3,
    );
    expect(nextStops).toStrictEqual(['Station5', 'Station1', 'Station2']);
  });

  it(`throws if called with direction Backward`, () => {
    const act = () =>
      getNextStops(cyclicLine, Direction.Backward, 'Station5, 3');
    expect(act).toThrowError();
  });
});
