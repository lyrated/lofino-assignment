import { useCallback, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import Grid from '@mui/material/Grid';

import { Line } from '../../types/Line';
import LinesStationsInfo from './LinesStationsInfo';
import LinesStationsList from './LinesStationsList';

interface LinesStationsProps {
  /** selected line */
  lineData: Line;
}

/**
 * Lists all stations and fetches information of a selected station
 */
export default function LinesStations({ lineData }: LinesStationsProps) {
  const [selectedStation, setSelectedStation] = useState<string>();
  const [accessibleLines, setAccessibleLines] = useState<Line[]>();
  const [nextStops, setNextStops] = useState<string[]>();

  const fetchAccessibleLines = useCallback(
    async (station: string) => {
      try {
        const response: AxiosResponse<Line[]> = await axios.get(
          `http://localhost:8080/lines/${lineData.name}/${station}/changes`
        );
        setAccessibleLines(response.data);
      } catch (e: unknown) {
        // here a message should be shown on the UI instead
        console.error(e);
      }
    },
    [lineData.name]
  );

  const fetchNextStops = useCallback(
    async (station: string) => {
      try {
        const response: AxiosResponse<string[]> = await axios.get(
          `http://localhost:8080/lines/${lineData.name}/${station}/next`
        );
        setNextStops(response.data);
      } catch (e: unknown) {
        // here a message should be shown on the UI instead
        console.error(e);
      }
    },
    [lineData.name]
  );

  const onStationClick = useCallback(
    (station: string) => {
      setSelectedStation((oldSelected) => {
        if (oldSelected !== station) {
          fetchAccessibleLines(station);
          fetchNextStops(station);
        }

        return station;
      });
    },
    [fetchAccessibleLines, fetchNextStops]
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs>
        <LinesStationsList
          lineData={lineData}
          selectedStation={selectedStation}
          onStationClick={onStationClick}
        />
      </Grid>

      <Grid item xs>
        {accessibleLines && nextStops && (
          <LinesStationsInfo
            accessibleLines={accessibleLines}
            nextStops={nextStops}
          />
        )}
      </Grid>
    </Grid>
  );
}
