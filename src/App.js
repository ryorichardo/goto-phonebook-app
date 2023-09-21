import logo from './logo.svg';
import './App.css';

import { AppBar, Typography, Container } from '@mui/material';
import ContactPage from './views/ContactPage';

function App() {
    return (
        <div className="App">
            <AppBar position="fixed" sx={{ backgroundColor:"primary", padding:'20px' }}>
                <Typography variant="h4" color="white" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Phonebook App
                </Typography>
            </AppBar>
            <Container sx={{
                marginTop: 10,
                padding: 0,
            }}>
                <ContactPage />
            </Container>
        </div>
    );
}

export default App;
