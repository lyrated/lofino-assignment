import { SxProps } from '@mui/material/styles';

export const chipUbahnSx = (lineColor: string, selected: boolean): SxProps => ({
  color: '#ffffff',
  fontWeight: 'bold',
  backgroundColor: selected ? '#e0e0e0' : lineColor,
  borderRadius: 0,
});
