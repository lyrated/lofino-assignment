import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Line } from '../../types/Line';
import LinesUbahn from './LinesUbahn';
import LinesStations from './LinesStations';

/**
 * Fetches and lists the line data from the backend
 */
export default function Lines() {
  const [lines, setLines] = useState<Line[]>([]);
  const [lineData, setLineData] = useState<Line>();

  useEffect(() => {
    async function fetchLines() {
      const response: AxiosResponse<Line[]> = await axios.get(
        'http://localhost:8080/lines'
      );
      setLines(response.data);
    }

    fetchLines();
  }, []);

  const onLineClick = async (line: string) => {
    try {
      const response: AxiosResponse<Line> = await axios.get(
        `http://localhost:8080/lines/${line}`
      );
      setLineData(response.data);
    } catch (e: unknown) {
      // here a message should be shown on the UI instead
      console.error(e);
    }
  };

  return (
    <>
      {lines.length > 0 && (
        <Grid container spacing={1} direction="column">
          <Grid item>
            <Typography variant="h3" component="h1">
              Berlin U-Bahn {lineData && lineData.name}
            </Typography>
          </Grid>
          <Grid item>
            <LinesUbahn
              lines={lines}
              selectedLine={lineData}
              onLineClick={onLineClick}
            />
          </Grid>
          {lineData && (
            <Grid item>
              <LinesStations lineData={lineData} />
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}
