import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Lines from './components/lines/Lines';

function App() {
  return (
    <div className="App">
      <Container>
        <Box my={4}>
          <Lines />
        </Box>
      </Container>
    </div>
  );
}

export default App;
