import logo from './logo.svg';
import './App.css';

import { AppBar, Typography, Container } from '@mui/material';
import ContactPage from './views/ContactPage';

function App() {
  return (
    <div className="App">
        <AppBar position="fixed" sx={{ backgroundColor: 'red', padding:'20px' }}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Phonebook App
            </Typography>
        </AppBar>
        <Container sx={{
            marginTop: 12,
            marginBottom: 2
        }}>
            <ContactPage />
        </Container>
    </div>
  );
}

export default App;
