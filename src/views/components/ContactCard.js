import PropTypes from 'prop-types';
import {  Card, Grid, Stack, Typography, Box, CardActionArea } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import ModalConfirm from 'components/ModalConfirm';


function ContactCard({ contact, setSelectedContact, setDetailModal, setDeleteModal, listFavo, setFavo, removeFavo }) {
    const favouriteHandler = () => {
        setSelectedContact(contact)
        setFavo(contact.id)
    }

    const detailModalHandler = () => {
        setSelectedContact(contact)
        setDetailModal(current => !current)
    }

    const deleteModalHandler = () => {
        setSelectedContact(contact)
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
                    <Grid item xs={3} lg={2} justifyContent='center' alignContent='center' sx={{ margin: 'auto' }} onClick={detailModalHandler}>
                        <Box 
                            component="img"
                            sx={{
                                height: { xs: 50, md: 75 },
                                width: { xs: 50, md: 75 },
                                borderRadius: { xs: 3, md: 4 },
                            }}
                            alt="Profile picture"
                            src="https://i.pinimg.com/736x/2c/d0/16/2cd0166a3b2f3ae98caf92daaa075e05.jpg"
                        />
                    </Grid>
                    <Grid item alignItems="left" xs={6} sm={5} lg={7} onClick={detailModalHandler} sx={{ margin: "auto" }}>
                        <Stack>
                            <Typography variant="h6" sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{contact.first_name} {contact.last_name}</Typography>
                            <Typography variant="caption" sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{contact.phones[0].number}</Typography>
                            {contact.phones.length > 1 ? (
                                <Typography variant="caption"><b>+{contact.phones.length-1} more</b></Typography>
                            ) : (
                                <></>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sm={4} md={3} sx={{ textAlign: 'center', margin: 'auto' }}>
                        <StarBorderIcon onClick={favouriteHandler} sx={{ color: 'rgb(150, 150, 150)', fontSize: 25 }}/>
                        <EditOutlinedIcon onClick={detailModalHandler} sx={{ color: 'rgb(150, 150, 150)', fontSize: 25 }} />
                        <DeleteOutlineOutlinedIcon onClick={deleteModalHandler} sx={{ color: 'rgb(150, 150, 150)', fontSize: 25 }} />
                    </Grid>
                </Grid>            
            </CardActionArea>
        </Card>
    );
}

ContactCard.propTypes = {
    Contact: PropTypes.object,
    handleDelete: PropTypes.func
};

export default ContactCard;
