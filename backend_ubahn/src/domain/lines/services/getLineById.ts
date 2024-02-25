import { Line } from '../types/Line';

/**
 * @param requestedLineId name of the requested line
 * @param lines array of lines where the requested line is searched in
 * @returns first found line, or undefined if not found
 */
export const getLineById = (
  requestedLineId: string,
  lines: Line[]
): Line | undefined => {
  return lines.find((line) => line.name === requestedLineId);
};
