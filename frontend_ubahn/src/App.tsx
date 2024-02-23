import { Container } from '@mui/material';

import Lines from './components/lines/Lines';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container sx={{ marginTop: 4 }}>
          <Lines />
        </Container>
      </header>
    </div>
  );
}

export default App;
