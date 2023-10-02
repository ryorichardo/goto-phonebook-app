import React from 'react';
import {  Grid,  Stack, Typography, Box, CardActionArea } from '@mui/material';
import { contact } from '../../configs/constant';

// interface contact {
//     id: number,
//     first_name: string,
//     last_name: string,
//     phones: { number: string }[]
// }

// interface arrayContact extends Array<contact>{}
interface IFavouriteContactCard {
    contacts: contact[],
    setSelectedContact: React.Dispatch<React.SetStateAction<contact>>,
    setDetailModal: React.Dispatch<React.SetStateAction<boolean>>
}

function FavouriteContactCard({ contacts, setSelectedContact, setDetailModal }: IFavouriteContactCard) {
    const detailModalHandler = (contact: contact) => {
        setSelectedContact(contact)
        setDetailModal(current => !current)
    }

    return (
        <Grid container sx={{ width: "100%", overflowX: "auto", height: "100%", flexWrap: "nowrap", display: "flex", marginTop: 5 }}>
            {contacts.length? (
                contacts.map(contact => (
                    <CardActionArea onClick={() => detailModalHandler(contact)} sx={{ borderRadius: 5, width: "auto" }}>
                        <Grid item sx ={{ flex: "0 0 auto", margin: { xs: 1, md: 2 }, marginBottom: 0, width: 100, height: { xs: 135, md: 160 }, textAlign: "center", color:"white" }}>
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
                                <Typography variant="caption" sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{contact.first_name} {contact.last_name}</Typography>
                                <Typography variant="caption" sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{contact?.phones[0]?.number!}</Typography>
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
            )}
        </Grid>            
    );
};

export default FavouriteContactCard;