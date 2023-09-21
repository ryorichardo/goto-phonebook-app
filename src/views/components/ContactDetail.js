import { Card, CardMedia, CardContent, CardActions, Button, Typography, Dialog, List, ListItem, Grid, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
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
    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState(contact?.first_name)
    const [lastName, setLastName] = useState(contact?.last_name)
    const [phone, setPhone] = useState(contact?.phones[0].number)

    const deleteModalHandler = () => {
        setDeleteModal(current => !current)
    }

    const editModeHandler = () => {
        if (edit) {
            setFirstName(contact.first_name)
            setLastName(contact.last_name)
            setPhone(contact.phones[0].number)
        }
        setEdit(current => !current)
    }

    const setFavouriteHandler = () => {
        setFavo(contact.id)
    }

    const removeFavouriteHandler = () => {
        removeFavo(contact.id)
    }

    const setClose = () => {
        setEdit(false);
        setOpen()
    }

    return (
        <BootstrapDialog open={open} onClose={setClose}>
            <Card sx={{ width: { xs: 300, md: 500 } }}>
                <CardMedia
                    component="img"
                    alt="Profile pic"
                    height="200"
                    image="https://i.pinimg.com/736x/2c/d0/16/2cd0166a3b2f3ae98caf92daaa075e05.jpg"
                />
                <DeleteOutlineRoundedIcon onClick={deleteModalHandler} sx={{ 
                    backgroundColor:'rgba(255, 255, 255, 0.5)', 
                    borderRadius:5,
                    padding: 0.5,
                    color: 'white', 
                    position:'absolute', 
                    top: 10, 
                    right: 10,
                    fontSize: 20
                    }} 
                />
                {edit? (
                    <>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={11}>
                                    <TextField
                                        autoFocus
                                        required
                                        id="first_name"
                                        label="First Name"
                                        type="string"
                                        fullWidth
                                        variant="standard"
                                        defaultValue={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        sx={{ marginBottom: 1 }}
                                    />
                                    <TextField
                                        required
                                        id="last_name"
                                        label="Last Name"
                                        type="string"
                                        fullWidth
                                        variant="standard"
                                        defaultValue={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        sx={{ marginBottom: 1 }}
                                    />
                                    <TextField
                                        required
                                        id="phone"
                                        label="Phone Number"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        defaultValue={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={1} sx={{ marginTop: 0.5 }}>
                                    {listFavo?.includes(contact?.id)? (
                                        <StarIcon onClick={removeFavouriteHandler} sx={{ color: 'gold' }}/>
                                    ) : (
                                        <StarBorderIcon onClick={setFavouriteHandler} sx={{ color: 'rgb(150, 150, 150)' }}/>
                                    )}
                                </Grid>
                            </Grid>
                        </CardContent>
                        <DialogActions>
                            <Button size="small" onClick={editModeHandler}>Cancel</Button>
                            <Button size="small" variant="contained">Save</Button>
                        </DialogActions>
                    </>
                ) : (
                    <>
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
                            <Button size="small" onClick={setClose}>Close</Button>
                            <Button size="small" variant="contained" onClick={editModeHandler}>Edit</Button>
                        </DialogActions>
                    </>
                )}
            
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
