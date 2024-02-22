import { Direction } from '../enums/Direction';
import { Line } from '../models/Line';

/**
 * Computes which stations of a given line follow next after a given station
 *
 * @returns the next `nStops` stations of `line`, counting from `fromStation` and in direction `direction`
 */

export function getNextStops(
  line: Line,
  /**
   * if `forward`, returns the stations that follow `fromStation` in the `line.stations` array.
   *
   * if `backward`, returns the stations that precede `fromStation` in the `line.stations` array.
   */
  direction: Direction,
  /**
   * which station within `line` to base the computation on
   */
  fromStation: string,
  /**
   * the maximum number of stops that should be returned
   */
  nStops = 3,
): string[] {
  if (direction === Direction.Backward) {
    line.stations = line.stations.reverse();
  }

  const fromIndex = line.stations.indexOf(fromStation);

  if (fromIndex === -1) {
    throw new Error('Station not found on line.');
  }

  return line.stations.slice(fromIndex + 1, fromIndex + nStops + 1);
}
