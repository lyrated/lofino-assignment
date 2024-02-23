import { Line } from '../types/Line';

export const getAllLines = (lines: Line[]) => {
  return lines.map((line) => ({
    name: line.name,
    color: line.color,
  }));
};
