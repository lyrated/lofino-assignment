import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chip, Grid } from '@mui/material';

import { Line } from '../../types/Line';

/**
 * Fetches and lists the lines from the backend
 *
 * You should probably not use this component, it just serves as an example.
 */
export default function Lines() {
  const [lines, setLines] = useState<Line[]>([]);
  const [allStations, setAllStations] = useState<Line>();

  useEffect(() => {
    async function fetchLines() {
      const response = await axios.get('http://localhost:8080/lines');
      setLines(response.data);
    }

    fetchLines();
  }, []);

  // if we decide that "line" is not dynamic, we could also use an enum instead
  const onLineClick = async (line: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/lines/${line}`);
      setAllStations(response.data);
    } catch (e: unknown) {
      //
    }
  };

  return (
    <>
      {lines.length > 0 && (
        <Grid container>
          <Grid item container spacing={1}>
            {lines.map((line) => (
              <Grid item key={line.name}>
                <Chip
                  label={line.name}
                  size="small"
                  onClick={() => onLineClick(line.name)}
                  clickable
                  sx={{ backgroundColor: line.color }} />
              </Grid>))}
          </Grid>
          {allStations && <Grid item>
            {JSON.stringify(allStations)}
          </Grid>}
        </Grid>
      )}
    </>
  );
}
