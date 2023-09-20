import logo from './logo.svg';
import './App.css';

import { AppBar, Typography, Container } from '@mui/material';
import ContactPage from './views/ContactPage';

function App() {
    return (
        <div className="App">
            <AppBar position="fixed" sx={{ backgroundColor:"#304ffe", padding:'20px', boxShadow:'none' }}>
                <Typography variant="h4" color="white" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
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
