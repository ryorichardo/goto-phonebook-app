import { Card, CardContent, Button, Typography, Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useMutation } from '@apollo/client';
import DELETE_CONTACT from '../../api/deleteContact';
import GET_CONTACT_LIST from '../../api/getContactList';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
      borderRadius: '15px',
    }
  }));

function DeleteModal(props) {
    const { open, setOpen, contact, refetch } = props;
    const [deleteContact, { data, loading, error }] = useMutation(DELETE_CONTACT, {
        onComplete: () => {
            refetch()
    }});

    const deleteContactHandler = () => {
        deleteContact({
            variables: {
                id: contact.id
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
                <CardContent>
                    <Typography gutterBottom variant="h8" component="div">
                        Are you sure you want to delete { contact?.first_name } { contact?.last_name }?
                    </Typography>
                </CardContent>
                <DialogActions>
                    <Button size="small" onClick={setOpen}>Cancel</Button>
                    <Button size="small" variant="contained" onClick={deleteContactHandler}>Delete</Button>
                </DialogActions>
            </Card>
        </BootstrapDialog>
    )
}

export default DeleteModal;
