import { Line } from '../types/Line';

/**
 * @param lines all lines
 * @returns all lines mapped with only the name and color attribute
 */
export const getAllLines = (lines: Line[]) => {
  return lines.map((line) => ({
    name: line.name,
    color: line.color,
  }));
};
