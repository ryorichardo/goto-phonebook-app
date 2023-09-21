import React, { useEffect } from 'react';
import { useState } from 'react';
import {  Grid, IconButton, Stack, Typography, Box, CardActionArea } from '@mui/material';
import ContactDetail from './ContactDetail';

const HorizontalGrid = ({ contacts, listFavo, setFavo, removeFavo }) => {
    const [selectedContact, setSelectedContact] = useState()
    const [detail, setDetail] = useState(false);

    const detailModalHandler = () => {
        setDetail(current => !current)
    }

    return (
        <Grid container sx={{ width: "100%", overflowX: "auto", flexWrap: "nowrap", display: "flex" }}>
            {contacts.length? (
                contacts.map(contact => (
                    <CardActionArea onClick={() => {setSelectedContact(contact); detailModalHandler()}} sx={{ borderRadius: 5, width: "auto" }}>
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
                    </CardActionArea>
            ))) : (
                <Typography color="white" variant="h6" sx={{ textAlign: "center", margin: "auto", marginTop: 1.5 }}>No favourite contacts</Typography>
                // <CardActionArea>
                //     <Grid item sx ={{ flex: "0 0 auto", margin: 1, width: 100, textAlign: "center", color:"white" }}>
                //         <Stack justifyContent='center' alignContent='center'>
                //             <Box 
                //                 component="img"
                //                 sx={{
                //                     height: { xs: 75, md: 100 },
                //                     width: { xs: 75, md: 100 },
                //                     borderRadius: 100,
                //                     margin: "auto"
                //                 }}
                //                 alt="Profile picture"
                //                 src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                //             />
                //             <Typography variant="caption">No favourite contacts</Typography>
                //         </Stack>
                //     </Grid>
                // </CardActionArea>
            )}
            <ContactDetail
                open={detail}
                setOpen={detailModalHandler}
                contact={selectedContact}
                listFavo={listFavo}
                setFavo={setFavo}
                removeFavo={removeFavo}
            />
        </Grid>            
  );
};

export default HorizontalGrid;