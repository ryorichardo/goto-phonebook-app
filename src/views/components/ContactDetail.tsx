import { Card, CardMedia, CardContent, Button, Typography, List, ListItem, Grid, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import { useMutation } from '@apollo/client';
import EDIT_CONTACT from '../../api/editContact';
import EDIT_PHONE_NUMBER from '../../api/editPhoneNumber';
import ADD_NUMBER_TO_CONTACT from '../../api/addNumberToContact';
import GET_CONTACT_LIST from '../../api/getContactList';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { contact } from '../../configs/constant.js';


function ContactDetail(props: { 
    setOpen: () => void, 
    edit: boolean,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    contact: contact,
    listFavo: number[],
    setFavo: (id: number) => void,
    removeFavo: (id: number) => void,
    refetch: () => void,
    listContact: contact[] }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const { setOpen, edit, setEdit, contact, listFavo, setFavo, removeFavo, refetch, listContact } = props;
    const [deleteModal, setDeleteModal] = useState(false);
    const [firstName, setFirstName] = useState(contact?.first_name)
    const [lastName, setLastName] = useState(contact?.last_name)
    const [phone, setPhone] = useState(contact?.phones.map((el) => { return el.number }))
    const [helperFirstName, setHelperFirstName] = useState('')
    const [helperLastName, setHelperLastName] = useState('')
    const firstNames = listContact.map((e: contact) => e.first_name.toLowerCase()).filter((name: string) => name !== contact?.first_name)
    const lastNames = listContact.map((e: contact) => e.last_name.toLowerCase()).filter((name: string) => name !== contact?.first_name)

    const [editContact] = useMutation(EDIT_CONTACT, {
        onCompleted: () => {
            refetch()
    }});
    const [editPhone] = useMutation(EDIT_PHONE_NUMBER, {
        onCompleted: () => {
            refetch()
    }});
    const [addPhone] = useMutation(ADD_NUMBER_TO_CONTACT, {
        onCompleted: () => {
            refetch()
    }});

    const deleteModalHandler = () => {
        setDeleteModal(current => !current)
    }

    const editModeHandler = () => {
        setFirstName(contact?.first_name)
        setLastName(contact?.last_name)
        setPhone(contact?.phones.map((el) => { return el.number }))
        setEdit((current: boolean) => !current)
    }

    const setFavouriteHandler = () => {
        setFavo(contact.id)
    }

    const removeFavouriteHandler = () => {
        removeFavo(contact.id)
    }

    const changePhoneHandler = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const values = [...phone];
        values[index] = event.target.value;
        setPhone(values);
    };

    const addPhoneHandler = () => {
        setPhone([...phone, '']);
    };

    const removePhoneHandler = (index: number) => {
        const values = [...phone];
        values.splice(index, 1);
        setPhone(values);
    };

    const arraysEqual = (a1: Array<any>, a2: Array<any>) => {
        return (a1.length === a2.length && a1.every((el: any, idx: number) => el.number === a2[idx]));
    }

    useEffect(() => {
        if (firstNames.includes(firstName.toLowerCase()) && lastNames.includes(lastName.toLowerCase())) {
            setHelperFirstName("Contact name already exist")
            setHelperLastName("Contact name already exist")
        } else {
            if (lastName?.match(/[0-9!@#$%^&*)(+=._-]/g)) {
                setHelperLastName("Contact name can not include special characters")
            } else {
                setHelperLastName("")
            }

            if (firstName?.match(/[0-9!@#$%^&*)(+=._-]/g)) {
                setHelperFirstName("Contact name can not include special characters")
            } else {
                setHelperFirstName("")
            }
        }
    }, [firstName, lastName, firstNames, lastNames])

    const editContactHandler = () => {
        if (helperFirstName.length === 0 && helperLastName.length === 0) {
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
                    }],
                })
            } 
    
            if (!arraysEqual(phone, contact.phones)) {
                contact.phones.forEach((_, idx) => {
                    if (contact.phones[idx].number !== phone[idx] && idx < phone.length) {
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
                                // awaitRefetchQueries: true,
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
                        }],
                    })
                }
            }
    
            setEdit(false)
            setOpen()
        }
    }

    const setClose = () => {
        editModeHandler()
        setEdit(false)
        setOpen()
    }

    return (
        <>
            <ClickAwayListener onClickAway={() => setEdit(false)}>
            <Card sx={{ width: { xs: 300, md: 400 }, overflowY: "scroll", borderRadius: "15px", maxHeight: { xs: "500px" } }}>
                <CardMedia
                    component="img"
                    alt="Profile pic"
                    height="200"
                    image="https://i.pinimg.com/736x/2c/d0/16/2cd0166a3b2f3ae98caf92daaa075e05.jpg"
                />
                {!matches ? (
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
                ) : (
                    <DeleteOutlineRoundedIcon onClick={deleteModalHandler} sx={{ 
                        backgroundColor:'rgba(255, 255, 255, 0.5)', 
                        borderRadius:5,
                        padding: 0.5,
                        color: 'white', 
                        position:'absolute', 
                        top: 40, 
                        right: 35,
                        fontSize: 20
                        }} 
                    />
                )}
                {edit? (
                    <>
                        <CardContent sx={{ paddingBottom: 0 }}>
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
                                        helperText={helperFirstName}
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
                                        helperText={helperLastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        sx={{ marginBottom: 1 }}
                                    />
                                </Grid>
                                <Grid item xs={1} sx={{ marginTop: 0.5, textAlign: "center" }}>
                                    {listFavo?.includes(contact?.id)? (
                                        <StarIcon onClick={removeFavouriteHandler} sx={{ color: 'gold' }}/>
                                    ) : (
                                        <StarBorderIcon onClick={setFavouriteHandler} sx={{ color: 'rgb(150, 150, 150)' }}/>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    {phone?.map((el, index) => (
                                        <Grid container>
                                            <Grid item xs={phone.length > 1? 11 : 12}>
                                                <TextField
                                                    required
                                                    id={index.toString()}
                                                    label="Phone Number"
                                                    type="number"
                                                    fullWidth
                                                    variant="standard"
                                                    value={el}
                                                    onChange={(event) => changePhoneHandler(index, event)}
                                                    sx={{ marginBottom: 1 }}
                                                    InputProps={{
                                                        inputProps: { min: 0 }
                                                    }}
                                                />
                                            </Grid>
                                            {phone.length > 1? (
                                                <Grid item xs={1}>
                                                    <DeleteOutlineOutlinedIcon onClick={() => removePhoneHandler(index)} sx={{ color: 'rgb(150, 150, 150)', marginLeft: 0.5, marginTop: 2.5 }} />
                                                </Grid>
                                            ) : (<></>)}
                                        </Grid>
                                    ))}
                                    <Grid container onClick={() => addPhoneHandler()}>
                                        <Grid item>
                                            <Typography variant="caption" sx={{ width: "100%" }}>
                                                Add more Number
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <AddCircleOutlineIcon sx={{ color: 'rgb(150, 150, 150)', fontSize: 13, marginLeft: 0.25, marginTop: 0.75 }} />
                                        </Grid>
                                    </Grid>
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
                        <CardContent sx={{ paddingBottom: 0 }}>
                            <Grid container>
                                <Grid item xs={11}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {contact?.first_name} {contact?.last_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1} sx={{ marginTop: 0.5, textAlign: "center" }}>
                                    {listFavo?.includes(contact?.id)? (
                                        <StarIcon onClick={removeFavouriteHandler} sx={{ color: 'gold' }}/>
                                    ) : (
                                        <StarBorderIcon onClick={setFavouriteHandler} sx={{ color: 'rgb(150, 150, 150)' }}/>
                                    )}
                                </Grid>
                            </Grid>
                            <List sx={{ padding: 0 }}>
                                {contact?.phones?.map((value) => (
                                    <ListItem sx={{ paddingLeft: 0 }}>
                                        <PhoneIcon sx={{ color: 'rgb(150, 150, 150)', fontSize: 20, marginRight: 1 }} />
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
            </ClickAwayListener>
            <DeleteModal
                    open={deleteModal}
                    setOpen={deleteModalHandler}
                    contact={contact}
                    refetch={refetch}
            />
        </>
    )
}

export default ContactDetail;
