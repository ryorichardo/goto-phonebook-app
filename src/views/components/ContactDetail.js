import { Card, CardMedia, CardContent, CardActions, Button, Typography, Dialog, List, ListItem, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
      borderRadius: '10px',
    }
  }));

function ContactDetail(props) {
    const { open, setOpen, contact, listFavo, setFavo, removeFavo } = props;
    const [deleteModal, setDeleteModal] = useState(false);

    const deleteModalHandler = () => {
        setDeleteModal(current => !current)
    }

    const setFavouriteHandler = () => {
        setFavo(contact.id)
    }

    const removeFavouriteHandler = () => {
        removeFavo(contact.id)
    }

    return (
        <BootstrapDialog open={open} onClose={setOpen}>
            <Card sx={{ width: { xs: 300, md: 500 } }}>
                <CardMedia
                    component="img"
                    alt="Profile pic"
                    height="200"
                    image="https://i.pinimg.com/736x/2c/d0/16/2cd0166a3b2f3ae98caf92daaa075e05.jpg"
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={11}>
                            <Typography gutterBottom variant="h5" component="div">
                                {contact?.first_name} {contact?.last_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} sx={{ marginTop: 0.5 }}>
                            {listFavo?.includes(contact?.id)? (
                                <StarIcon onClick={removeFavouriteHandler} sx={{ color: 'gold' }}/>
                            ) : (
                                <StarBorderIcon onClick={setFavouriteHandler} sx={{ color: 'rgb(150, 150, 150)' }}/>
                            )}
                        </Grid>
                    </Grid>
                    <Typography gutterBottom variant="h8" component="div">
                        Phone Number
                    </Typography>
                    <List>
                        {contact?.phones?.map((value) => (
                            <ListItem>
                                <Typography variant="body2" sx={{ fontWeight: 'normal' }}>
                                    {value.number}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
                <DialogActions>
                    <Button size="small">Edit</Button>
                    <Button size="small" variant="contained" onClick={deleteModalHandler}>Delete</Button>
                </DialogActions>
            </Card>
            <DeleteModal
                    open={deleteModal}
                    setOpen={deleteModalHandler}
                    contact={contact}
            />
        </BootstrapDialog>
    )
}

export default ContactDetail;
