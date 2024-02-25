import ArrowRight from '@mui/icons-material/ArrowRight';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Line } from '../../types/Line';

interface LinesStationsListProps {
  /** 'Line' object retrieved from backend */
  lineData: Line;
  /** state of selected station to change its style */
  selectedStation: string | undefined;
  /** click event on a station */
  onStationClick: (station: string) => void;
}

/**
 * Lists all stations of a selected line
 */
export default function LinesStationsList({
  lineData,
  selectedStation,
  onStationClick,
}: LinesStationsListProps) {
  return (
    <List>
      {lineData.stations?.map((station) => (
        <ListItemButton
          key={station}
          selected={selectedStation === station}
          onClick={() => onStationClick(station)}
          sx={{ borderTop: '1px solid #d0d0d0' }}
        >
          <ListItemText primary={station} />
          <ArrowRight />
        </ListItemButton>
      ))}
    </List>
  );
}
