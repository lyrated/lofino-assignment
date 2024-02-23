import { Line } from '../types/Line';

export const getLineById = (requestedLineId: string, lines: Line[]): Line | undefined => {
  return lines.find((line) => line.name === requestedLineId);
};
