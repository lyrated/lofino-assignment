import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';

import { Line } from '../../types/Line';
import { chipUbahnSx } from './LinesUbahn.styles';

interface LinesUbahnProps {
  /** lines to be listed */
  lines: Line[];
  /** (optional) state of the selected line to change its style */
  selectedLine?: Line;
  /** (optional) click event on a line */
  onLineClick?: (line: string) => Promise<void>;
}

/**
 * Lists U-Bahn stations with their respective color
 */
export default function LinesUbahn({
  lines,
  selectedLine,
  onLineClick,
}: LinesUbahnProps) {
  return (
    <Grid container spacing={2}>
      {lines.map((line) => (
        <Grid item key={line.name}>
          <Chip
            label={line.name}
            size="small"
            onClick={() => onLineClick && onLineClick(line.name)}
            clickable={!!onLineClick && line.name !== selectedLine?.name}
            sx={chipUbahnSx(line.color, line.name === selectedLine?.name)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
