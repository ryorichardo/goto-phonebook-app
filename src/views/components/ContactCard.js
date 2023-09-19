import PropTypes from 'prop-types';
import { Button, Card, Grid, IconButton, Stack, Typography, Box } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from 'react';
import ContactDetail from './ContactDetail';
// import ModalConfirm from 'components/ModalConfirm';


function ContactCard({ contact, handleDelete }) {
    const { id, first_name, last_name, phones } = contact;
    const [modal, setModal] = useState(false);

    const modalHandler = () => {
        setModal(current => !current)
    }

    return (
        <Card 
            sx={{
                borderRadius: 2,
            }}
        >
            <Grid container spacing={1} sx={{ padding:"10px" }}>
                <Grid item xs={3} justifyContent='center' alignContent='center' sx={{ margin: 'auto' }}>
                    <Box 
                        component="img"
                        sx={{
                            height: { xs: 50, md: 100 },
                            width: { xs: 50, md: 100 },
                            borderRadius: { xs: 3, md: 5 },
                        }}
                        alt="Profile picture"
                        src="https://i.pinimg.com/736x/2c/d0/16/2cd0166a3b2f3ae98caf92daaa075e05.jpg"
                    />
                </Grid>
                <Grid item alignItems="left" xs={6}>
                    <Stack>
                        <Typography variant="h6">{first_name} {last_name}</Typography>
                        {phones.length > 1 ? (
                            <Typography variant="caption">{phones[0].number} <b>+{phones.length-1} more</b></Typography>
                        ) : (
                            <Typography variant="caption">{phones[0].number}</Typography>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'right', margin: 'auto' }}>
                    <StarBorderIcon sx={{ color: 'rgb(150, 150, 150)' }}/>
                    <EditOutlinedIcon onClick={modalHandler} sx={{ color: 'rgb(150, 150, 150)' }} />
                    <DeleteOutlineOutlinedIcon sx={{ color: 'rgb(150, 150, 150)' }} />
                </Grid>
            </Grid>            
            <ContactDetail
                open={modal}
                setOpen={modalHandler}
                contact={{ id, first_name, last_name, phones }}
            />
        </Card>
    );
}

ContactCard.propTypes = {
    Contact: PropTypes.object,
    handleDelete: PropTypes.func
};

export default ContactCard;
