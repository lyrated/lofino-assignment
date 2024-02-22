import { Line } from '../models/Line';

/**
 * returns an array of `Line`s that are accessible from the station with name `fromStation`.
 *
 * @returns all lines that are accessible on station `fromStation` in line `onLine`, except `onLine` itself
 */

export function getAccessibleLines(
  onLine: Line,
  fromStation: string,
  allLines: Line[],
): Line[] {
  return allLines.filter((line) => {
    return line.stations.includes(fromStation) && line.name !== onLine.name;
  });
}
