import { Card, CardContent, CardActions, Button, Typography, Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import React from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
      borderRadius: '10px',
    }
  }));

function DeleteModal(props) {
    const { open, setOpen, contact } = props;
    return (
        <BootstrapDialog open={open} onClose={setOpen}>
            <Card sx={{ width: { xs: 300, md: 500 } }}>
                <CardContent>
                    <Typography gutterBottom variant="h8" component="div">
                        Are you sure you want to delete { contact.first_name } { contact.last_name }?
                    </Typography>
                </CardContent>
                <DialogActions>
                    <Button size="small" color="error" onClick={setOpen}>Cancel</Button>
                    <Button size="small" variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Card>
        </BootstrapDialog>
    )
}

export default DeleteModal;
