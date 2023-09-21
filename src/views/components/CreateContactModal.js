import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Card, CardMedia } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import ADD_CONTACT_WITH_PHONES from '../../api/addContactWithPhones';
import GET_CONTACT_LIST from '../../api/getContactList';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
      borderRadius: '10px',
    }
  }));

function CreateContactModal(props) {
    const { open, setOpen, refetch } = props;
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [phone, setPhone] = useState()
    const [createContact] = useMutation(ADD_CONTACT_WITH_PHONES, {
        onComplete: () => {
            refetch()
    }});

    const createContactHandler = () => {
        createContact({
            variables: {
                first_name: firstName,
                last_name: lastName,
                phones: [{number: phone}]
            },
            refetchQueries: [{
                query: GET_CONTACT_LIST,
                awaitRefetchQueries: true,
            }],
        })
        setOpen()
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
                <DialogTitle>Create new contact</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        id="first_name"
                        label="First Name"
                        type="string"
                        fullWidth
                        variant="standard"
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
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={setOpen}>Cancel</Button>
                    <Button size="small" variant="contained" onClick={createContactHandler}>Create</Button>
                </DialogActions>
            </Card>
        </BootstrapDialog>
    );
}

export default CreateContactModal