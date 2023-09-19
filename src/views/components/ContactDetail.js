import { Card, CardMedia, CardContent, CardActions, Button, Typography, Dialog, List, ListItem, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
      borderRadius: '20px',
    }
  }));

function ModalContent(contact) {
    return (
        <Card sx={{ width: { xs: 300, md: 500 } }}>
            <CardMedia
                component="img"
                alt="Profile pic"
                height="200"
                image="https://i.pinimg.com/736x/2c/d0/16/2cd0166a3b2f3ae98caf92daaa075e05.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {contact.contact.first_name} {contact.contact.last_name}
                </Typography>
                <Typography gutterBottom variant="h8" component="div">
                    Phone Number
                </Typography>
                <List>
                    {contact.contact.phones.map((value) => (
                        <ListItem>
                            <Typography variant="body2" sx={{ fontWeight: 'normal' }}>
                                {value.number}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

function ContactDetail(props) {
    const { open, setOpen, contact } = props;
    return (
        <BootstrapDialog open={open} onClose={setOpen}>
            <ModalContent contact={contact} />
        </BootstrapDialog>
    )
}

export default ContactDetail;
