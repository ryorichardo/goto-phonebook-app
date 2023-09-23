import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import ADD_CONTACT_WITH_PHONES from '../../api/addContactWithPhones';
import GET_CONTACT_LIST from '../../api/getContactList';

function CreateContactModal(props) {
    const { setOpen, refetch } = props;
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [phone, setPhone] = useState([{number: ''}])
    const [helperFirstName, setHelperFirstName] = useState('')
    const [helperLastName, setHelperLastName] = useState('')

    const [createContact] = useMutation(ADD_CONTACT_WITH_PHONES, {
        onComplete: () => {
            refetch()
    }});

    const createContactHandler = () => {
        createContact({
            variables: {
                first_name: firstName,
                last_name: lastName,
                phones: phone.filter(el => el.number !== 0)
            },
            refetchQueries: [{
                query: GET_CONTACT_LIST,
                awaitRefetchQueries: true,
            }],
        })
        closeModalHandler()
    }

    const changePhoneHandler = (index, event) => {
        const values = [...phone];
        values[index].number = event.target.value;
        setPhone(values);
    };

    const addPhoneHandler = () => {
        setPhone([...phone, { number: '' }]);
    };

    const removePhoneHandler = (index) => {
        const values = [...phone];
        values.splice(index, 1);
        setPhone(values);
    };

    const closeModalHandler = () => {
        setFirstName('')
        setLastName('')
        setPhone([{number: ''}])
        setOpen()
    }

    useEffect(() =>  {
        if (firstName?.match(/[0-9!@#\$%\^\&*\)\(+=._-]/g)) {
            setHelperFirstName("Contact name can not include special characters")
        } else {
            setHelperFirstName("")
        }
    }, [firstName])

    useEffect(() =>  {
        if (lastName?.match(/[0-9!@#\$%\^\&*\)\(+=._-]/g)) {
            setHelperLastName("Contact name can not include special characters")
        } else {
            setHelperLastName("")
        }
    }, [lastName])

    return (
            <Card sx={{ width: { xs: 300, md: 400 }, overflowY: "scroll", borderRadius: "15px", maxHeight: { xs: "500px" } }}>
                <CardMedia
                    component="img"
                    alt="Profile pic"
                    height="200"
                    image="https://i.pinimg.com/736x/2c/d0/16/2cd0166a3b2f3ae98caf92daaa075e05.jpg"
                />
                <DialogTitle  sx={{ paddingBottom: 0 }}>Create new contact</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                    <TextField
                        autoFocus
                        required
                        id="first_name"
                        label="First Name"
                        type="string"
                        fullWidth
                        variant="standard"
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
                        helperText={helperLastName}
                        onChange={(e) => setLastName(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    {phone.map((el, index) => (
                        <Grid container>
                            <Grid item xs={phone.length > 1? 11 : 12}>
                                <TextField
                                    required
                                    id={index}
                                    label="Phone Number"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={el.number}
                                    onChange={(event) => changePhoneHandler(index, event)}
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
                    <Grid container onClick={() => addPhoneHandler()} sx={{ marginTop: 1 }}>
                        <Grid item>
                            <Typography variant="caption" sx={{ width: "100%" }}>
                                Add more Number
                            </Typography>
                        </Grid>
                        <Grid item>
                            <AddCircleOutlineIcon sx={{ color: 'rgb(150, 150, 150)', fontSize: 13, marginLeft: 0.25, marginTop: 0.75 }} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={closeModalHandler}>Cancel</Button>
                    <Button size="small" variant="contained" onClick={createContactHandler}>Create</Button>
                </DialogActions>
            </Card>
    );
}

export default CreateContactModal