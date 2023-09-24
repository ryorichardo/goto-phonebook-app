import PropTypes from 'prop-types';
import { Card, Grid, Stack, Typography, Box, CardActionArea, Popper, Fade, Paper } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useState } from 'react';
import React from 'react';
import { contact } from '../../configs/constant';

// import ModalConfirm from 'components/ModalConfirm';


function ContactCard(props: { 
    contact: contact, 
    setSelectedContact: React.Dispatch<React.SetStateAction<contact>>, 
    setDetailModal: React.Dispatch<React.SetStateAction<boolean>>,
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    setFavo: (id: number) => void }) {
    const { contact, setSelectedContact, setDetailModal, setDeleteModal, setFavo } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handlePopper = () => (event: any) => {
      setAnchorEl(event.currentTarget);
      setOpen(current => !current);
    };

    const favouriteHandler = () => {
        setSelectedContact(contact)
        setFavo(contact.id)
    }

    const detailModalHandler = () => {
        setSelectedContact(contact)
        setDetailModal(current => !current)
    }

    const deleteModalHandler = () => {
        setSelectedContact(contact)
        setDeleteModal(current => !current)
    }

    return (
        <Card 
            sx={{
                borderRadius: 2,
            }}
        >
            <CardActionArea>
                <Grid container spacing={1} sx={{ padding:"10px" }}>
                    <Grid item xs={3} lg={2} justifyContent='center' alignContent='center' sx={{ margin: 'auto' }} onClick={detailModalHandler}>
                        <Box 
                            component="img"
                            sx={{
                                height: { xs: 50, md: 75 },
                                width: { xs: 50, md: 75 },
                                borderRadius: 10,
                            }}
                            alt="Profile picture"
                            src="https://i.pinimg.com/736x/2c/d0/16/2cd0166a3b2f3ae98caf92daaa075e05.jpg"
                        />
                    </Grid>
                    <Grid item alignItems="left" xs={8} lg={9} onClick={detailModalHandler} sx={{ margin: "auto" }}>
                        <Stack>
                            <Typography variant="h6" sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{contact.first_name} {contact.last_name}</Typography>
                            <Typography variant="caption" sx={{ color: 'rgb(150, 150, 150)', textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{contact.phones[0].number}</Typography>
                            {contact.phones.length > 1 ? (
                                <Typography variant="caption" sx={{ color: 'rgb(150, 150, 150)' }}><b>+{contact.phones.length-1} more</b></Typography>
                            ) : (
                                <></>
                            )}
                        </Stack>
                    </Grid>
                    <Grid onClick={handlePopper()} item xs={1} sx={{ textAlign: 'center', margin: 'auto', paddingLeft: "0 !important" }}>
                        <CardActionArea sx={{ borderRadius: 10 }}><MoreVertIcon sx={{ color: 'rgb(150, 150, 150)', fontSize: 25 }} /></CardActionArea>
                    </Grid>
                </Grid>            
            </CardActionArea>
            <Popper open={open} anchorEl={anchorEl} placement='left' transition>
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                            <Stack>
                                <CardActionArea><Typography sx={{ p: 1.5 }} onClick={favouriteHandler}>Add to favourites</Typography></CardActionArea>
                                <CardActionArea><Typography sx={{ p: 1.5 }} onClick={deleteModalHandler}>Delete contact</Typography></CardActionArea>
                            </Stack>
                        </ClickAwayListener>
                    </Paper>
                </Fade>
                )}
            </Popper>
        </Card>
    );
}

ContactCard.propTypes = {
    Contact: PropTypes.object,
    handleDelete: PropTypes.func
};

export default ContactCard;
