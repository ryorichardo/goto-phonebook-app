import React from 'react';
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper, Button, Card, Grid, IconButton, Stack, Typography, Box, CardActionArea } from '@mui/material';
import ContactDetail from './ContactDetail';

const HorizontalGrid = ({ contacts }) => {
    return (
        <Grid container sx={{ width: "100%", overflowX: "auto", flexWrap: "nowrap", display: "flex" }}>
            {contacts.length? (
                contacts.map(contact => (
                <Grid item sx ={{ flex: "0 0 auto", margin: 1, width: 100, textAlign: "center", color:"white" }}>
                    <Stack justifyContent='center' alignContent='center'>
                        <Box 
                            component="img"
                            sx={{
                                height: { xs: 75, md: 100 },
                                width: { xs: 75, md: 100 },
                                borderRadius: 100,
                                margin: "auto"
                            }}
                            alt="Profile picture"
                            src="https://i.pinimg.com/736x/2c/d0/16/2cd0166a3b2f3ae98caf92daaa075e05.jpg"
                        />
                        <Typography variant="caption">{contact.first_name} {contact.last_name}</Typography>
                        <Typography variant="caption">{contact.phones[0].number}</Typography>
                        {contact.phones.length > 1 ? (
                            <Typography variant="caption"><b>+{contact.phones.length-1} more</b></Typography>
                        ) : (
                            <></>
                        )}
                    </Stack>
                </Grid>
            ))) : (
                <Grid item sx ={{ flex: "0 0 auto", margin: 1, width: 100, textAlign: "center", color:"white" }}>
                    <Stack justifyContent='center' alignContent='center'>
                        <Box 
                            component="img"
                            sx={{
                                height: { xs: 75, md: 100 },
                                width: { xs: 75, md: 100 },
                                borderRadius: 100,
                                margin: "auto"
                            }}
                            alt="Profile picture"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        />
                        <Typography variant="caption">No favourite contacts</Typography>
                    </Stack>
                </Grid>
            )}
            {/* <ContactDetail
                open={detail}
                setOpen={detailModalHandler}
                contact={{ id, first_name, last_name, phones }}
            /> */}
        </Grid>            
  );
};

export default HorizontalGrid;