import Grid from '@mui/material/Grid';

import LinesUbahn from './LinesUbahn';
import { Line } from '../../types/Line';

interface LinesStationsInfoProps {
  /** other available lines of the selected line to list */
  accessibleLines: Line[];
  /** names of the next 3 stops on the line */
  nextStops: string[];
}

/**
 * Displays the selected station's information
 */
export default function LinesStationsInfo({
  accessibleLines,
  nextStops,
}: LinesStationsInfoProps) {
  return (
    <Grid container direction="column" spacing={1} pb={2}>
      {accessibleLines.length > 0 && (
        <Grid item container spacing={2} alignItems="center">
          <Grid item>Access to:</Grid>
          <Grid item>
            <LinesUbahn lines={accessibleLines} />
          </Grid>
        </Grid>
      )}

      <Grid item>
        {nextStops.length > 0 ? (
          <>
            <span>Next 3 stops:</span>
            <ul>
              {nextStops.map((stop) => (
                <li key={stop}>{stop}</li>
              ))}
            </ul>
          </>
        ) : (
          <span>Last stop</span>
        )}
      </Grid>
    </Grid>
  );
}
