import { Card, CardMedia, CardContent, Button, Typography, Dialog, List, ListItem, Grid, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import { useMutation } from '@apollo/client';
import EDIT_CONTACT from '../../api/editContact';
import EDIT_PHONE_NUMBER from '../../api/editPhoneNumber';
import ADD_NUMBER_TO_CONTACT from '../../api/addNumberToContact';
import GET_CONTACT_LIST from '../../api/getContactList';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
      borderRadius: '10px',
    }
  }));

function ContactDetail(props) {
    const { open, setOpen, contact, listFavo, setFavo, removeFavo, refetch } = props;
    const [deleteModal, setDeleteModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState(contact?.first_name)
    const [lastName, setLastName] = useState(contact?.last_name)
    const [phone, setPhone] = useState(contact?.phones.map((el) => { return el.number }))
    const [editContact] = useMutation(EDIT_CONTACT, {
        onComplete: () => {
            refetch()
    }});
    const [editPhone] = useMutation(EDIT_PHONE_NUMBER, {
        onComplete: () => {
            refetch()
    }});
    const [addPhone] = useMutation(ADD_NUMBER_TO_CONTACT, {
        onComplete: () => {
            refetch()
    }});

    const deleteModalHandler = () => {
        setDeleteModal(current => !current)
    }

    const editModeHandler = () => {
        setFirstName(contact?.first_name)
        setLastName(contact?.last_name)
        setPhone(contact?.phones.map((el) => { return el.number }))
        setEdit(current => !current)
    }

    const setFavouriteHandler = () => {
        setFavo(contact.id)
    }

    const removeFavouriteHandler = () => {
        removeFavo(contact.id)
    }

    const changePhoneHandler = (index, event) => {
        const values = [...phone];
        values[index] = event.target.value;
        setPhone(values);
    };

    const addPhoneHandler = () => {
        setPhone([...phone, '']);
    };

    const removePhoneHandler = (index) => {
        const values = [...phone];
        values.splice(index, 1);
        setPhone(values);
    };

    const arraysEqual = (a1, a2) => {
        return (a1.length === a2.length && a1.every((el, idx) => el.number === a2[idx]));
    }

    const editContactHandler = () => {
        if (firstName !== contact.first_name || lastName !== contact.last_name ) {
            editContact({
                variables: {
                    id: contact.id,
                    _set: {
                        first_name: firstName,
                        last_name: lastName,
                    }
                },
                refetchQueries: [{
                    query: GET_CONTACT_LIST,
                    awaitRefetchQueries: true,
                }],
            })
        } 

        if (!arraysEqual(phone, contact.phones)) {
            contact.phones.forEach((_, idx) => {
                if (contact.phones[idx].number !== phone[idx]) {
                    editPhone({
                        variables: {
                            pk_columns: {
                                number: contact.phones[idx].number,
                                contact_id: contact.id
                            },
                            new_phone_number: phone[idx]
                        },
                        refetchQueries: [{
                            query: GET_CONTACT_LIST,
                            awaitRefetchQueries: true,
                        }],
                    })
                }
            })
        }

        if (phone.length > contact.phones.length) {
            for (let i = contact.phones.length; i < phone.length; i++) {
                addPhone({
                    variables: {
                            contact_id: contact.id,
                            phone_number: phone[i]
                    },
                    refetchQueries: [{
                        query: GET_CONTACT_LIST,
                        awaitRefetchQueries: true,
                    }],
                })
            }
        }

        setEdit(false)
        setOpen()
    }

    const setClose = () => {
        editModeHandler()
        setEdit(false)
        setOpen()
    }

    return (
        <BootstrapDialog open={open} onClose={setClose}>
            <Card sx={{ width: { xs: 300, md: 500 }, overflowY: "scroll"  }}>
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
                                    {phone?.map((el, index) => (
                                        <Grid container>
                                            <Grid item xs={phone.length > 1? 11 : 12}>
                                                <TextField
                                                    required
                                                    id={index}
                                                    label="Phone Number"
                                                    type="string"
                                                    fullWidth
                                                    variant="standard"
                                                    value={el}
                                                    onChange={(event) => changePhoneHandler(index, event)}
                                                    sx={{ marginBottom: 1 }}
                                                />
                                            </Grid>
                                            {phone.length > 1? (
                                                <Grid item xs={1}>
                                                    <DeleteOutlineOutlinedIcon onClick={() => removePhoneHandler(index)} sx={{ color: 'rgb(150, 150, 150)', marginLeft: 0.5, marginTop: 2.5 }} />
                                                </Grid>
                                            ) : (<></>)}
                                        </Grid>
                                    ))}
                                    <Grid container onClick={() => addPhoneHandler()} sx={{ width: "auto" }}>
                                        <Grid item xs={6} sx={{ maxWidth: '105px' }}>
                                            <Typography variant="caption">
                                                Add more Number
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <AddCircleOutlineIcon sx={{ color: 'rgb(150, 150, 150)', fontSize: 13, marginLeft: 0.25, marginTop: 0.75 }} />
                                        </Grid>
                                    </Grid>
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
                            <Button size="small" variant="contained" onClick={editContactHandler}>Save</Button>
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
                            <List>
                                {contact?.phones?.map((value) => (
                                    <ListItem sx={{ paddingLeft: 0 }}>
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
