import logo from './logo.svg';
import './App.css';

import { AppBar, Typography, Container } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ContactPage from './views/ContactPage';
import DesktopContactPage from './views/DesktopContactPage';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    }));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

function App() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [search, setSearch] = useState()

    return (
        <div className="App">
            { matches? (
                <>
                    <AppBar position="fixed" sx={{ backgroundColor:"primary", padding:'20px' }}>
                        <Typography variant="h5" color="white" component="div" sx={{ textAlign: 'center' }}>
                            Phonebook App
                        </Typography>
                    </AppBar>
                    <Container sx={{ padding: "0 !important", margin: 0 }}>
                        <DesktopContactPage/>
                    </Container>
                </>
            ) : (
                <>
                    <AppBar position="fixed" sx={{ backgroundColor:"primary", padding:'20px', paddingLeft:'32px', paddingRight:'32px' }}>
                        <Typography variant="h5" color="white" component="div" sx={{ textAlign: 'center', marginBottom: 1 }}>
                            Phonebook App
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Search>
                    </AppBar>
                    <Container sx={{ marginTop: 10, padding: 0 }}>
                        <ContactPage search={search} />
                    </Container>
                </>

            ) }
        </div>
    );
}

export default App;
