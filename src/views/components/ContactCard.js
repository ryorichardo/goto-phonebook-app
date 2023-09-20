import PropTypes from 'prop-types';
import { Button, Card, Grid, IconButton, Stack, Typography, Box, CardActionArea } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from 'react';
import ContactDetail from './ContactDetail';
import DeleteModal from './DeleteModal';
// import ModalConfirm from 'components/ModalConfirm';


function ContactCard({ contact, handleDelete }) {
    const { id, first_name, last_name, phones } = contact;
    const [favourite, setFavourite] = useState(false);
    const [detail, setDetail] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const favouriteHandler = () => {
        setFavourite(current => !current)
    }

    const detailModalHandler = () => {
        setDetail(current => !current)
    }

    const deleteModalHandler = () => {
        setDeleteModal(current => !current)
    }


    return (
        <Card 
            sx={{
                borderRadius: 2,
            }}
        >
            <CardActionArea>
                <Grid container spacing={1} sx={{ padding:"10px" }}>
                    <Grid item xs={3} justifyContent='center' alignContent='center' sx={{ margin: 'auto' }} onClick={detailModalHandler}>
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
                    <Grid item alignItems="left" xs={6} onClick={detailModalHandler}>
                        <Stack>
                            <Typography variant="h6">{first_name} {last_name}</Typography>
                            {phones.length > 1 ? (
                                <Typography variant="caption">{phones[0].number} <b>+{phones.length-1} more</b></Typography>
                            ) : (
                                <Typography variant="caption">{phones[0].number}</Typography>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: 'center', margin: 'auto' }}>
                        {favourite? (
                            <StarIcon onClick={favouriteHandler} sx={{ color: 'gold' }}/>
                        ) : (
                            <StarBorderIcon onClick={favouriteHandler} sx={{ color: 'rgb(150, 150, 150)' }}/>
                        )}
                        
                        <EditOutlinedIcon onClick={detailModalHandler} sx={{ color: 'rgb(150, 150, 150)' }} />
                        <DeleteOutlineOutlinedIcon onClick={deleteModalHandler} sx={{ color: 'rgb(150, 150, 150)' }} />
                    </Grid>
                </Grid>            
                <ContactDetail
                    open={detail}
                    setOpen={detailModalHandler}
                    contact={{ id, first_name, last_name, phones }}
                />
                <DeleteModal
                    open={deleteModal}
                    setOpen={deleteModalHandler}
                    contact={{ id, first_name, last_name, phones }}
                />
            </CardActionArea>
        </Card>
    );
}

ContactCard.propTypes = {
    Contact: PropTypes.object,
    handleDelete: PropTypes.func
};

export default ContactCard;
