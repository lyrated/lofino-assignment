import { Direction } from '../enums/Direction';
import { Line } from '../types/Line';

/**
 * Computes which stations of a given line follow next after a given station
 *
 * @returns the next `nStops` stations of `line`, counting from `fromStation` and in direction `direction`
 */

export function getNextStops(
  line: Line,
  /**
   * which station within `line` to base the computation on
   */
  fromStation: string,
  /**
   * if `forward`, returns the stations that follow `fromStation` in the `line.stations` array.
   *
   * if `backward`, returns the stations that precede `fromStation` in the `line.stations` array.
   */
  direction: Direction = Direction.Forward,
  /**
   * the maximum number of stops that should be returned
   */
  nStops = 3,
): string[] {
  let stations = [...line.stations];

  if (direction === Direction.Backward) {
    stations = stations.reverse();
  }

  const fromIndex = stations.indexOf(fromStation);

  if (fromIndex === -1) {
    throw new Error('Station not found on line.');
  }

  return stations.slice(fromIndex + 1, fromIndex + nStops + 1);
}
