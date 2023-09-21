import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';

import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { gridSpacing } from '../configs/constant';

import GET_CONTACT_LIST from '../api/getContactList';

import ContactCard from './components/ContactCard';
import CreateContactModal from './components/CreateContactModal';
import HorizontalGrid from './components/FavouriteContactCard';

function ContactPage() {
    const { id } = useParams();
    // const [contact, setContact] = useState();

    const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
        variables: {
            // "where":  {
            //     "first_name": {"_like": "%Dedi%" }
            // }
        }
    });

    const [createContact, setCreateContact] = useState(false)
    const [page, setPage] = useState(1)
    const [allContact, setAllContact] = useState([])
    const [contactList, setContactList] = useState([])
    const [favourite, setFavourite] = useState([])

    useEffect(() => {
        if (localStorage.getItem('list_contact') && localStorage.getItem('list_contact') !== 'undefined') {
            const list_contact = JSON.parse(localStorage.getItem('list_contact'))
            setAllContact(list_contact)
            setContactList(list_contact?.contact?.slice((page-1)*10, Math.min(list_contact?.contact?.length, page*10)))
        } else if (data) {
            setAllContact(data)
            localStorage.setItem('list_contact', JSON.stringify(data))
            setContactList(data?.contact.slice((page-1)*10, Math.min(data?.contact.length, page*10)))
        }
    }, [page, data]);

    useEffect(() => {
        if (localStorage.getItem('list_favourite') && localStorage.getItem('list_favourite') !== 'undefined') {
            const list_favourite = JSON.parse(localStorage.getItem('list_favourite'))
            setFavourite(list_favourite)
        } else {
            localStorage.setItem('list_favourite', JSON.stringify([]))
        }
    }, [])

    const addFavouriteHandler = (id) => {
        if (!favourite.includes(id)) {
            setFavourite([...favourite, id]);
            localStorage.setItem('list_favourite', JSON.stringify([...favourite, id]))
        }
    }

    const removeFavouriteHandler = (id) => {
        if (favourite.includes(id)) {
            setFavourite(favourite.filter((el) => el !== id));
            localStorage.setItem('list_favourite', JSON.stringify(favourite.filter((el) => el !== id)))
        }
    }

    const createContactModalHandler = () => {
        setCreateContact(current => !current)
    }

    const paginationHandler = (event, newPage) => {
        setPage(newPage)
        setContactList(data?.contact.slice((newPage-1)*10, Math.min(data.contact.length, newPage*10)))
    }

    return (
        <>
            {allContact?.contact? (
                <>
                    <Container>
                        <Container sx={{ position: "sticky", top: "80px", paddingTop:"10px", backgroundColor: "#1776D2" }}>
                            <Typography color="white" variant="h6">Favourite contacts</Typography>
                        </Container>
                        <HorizontalGrid 
                            contacts={contactList.filter((contact) => favourite.includes(contact.id))} 
                            listFavo={favourite}
                            setFavo={addFavouriteHandler}
                            removeFavo={removeFavouriteHandler}
                        />
                    </Container>
                    <Container sx={{ position: "sticky", top: "80px", paddingTop:"10px", paddingLeft: 0, paddingRight: 0, backgroundColor: "#1776D2", zIndex: 1 }}>
                        <Typography color="white" variant="h6" sx={{ paddingLeft: "32px" }}>Regular contacts</Typography>
                        <Container sx ={{ backgroundColor: "#fafafa", height: "30px", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}></Container>
                    </Container>
                    <Container sx={{ backgroundColor: "#fafafa", paddingBottom: 2, minHeight: "45vh" }}>
                        {contactList.filter((contact) => !favourite.includes(contact.id)).length > 0? (
                            <>
                                <Grid container spacing={gridSpacing}>
                                    {contactList.filter((contact) => !favourite.includes(contact.id)).map((contact) => (
                                        <Grid item xl={12} lg={12} md={12} xs={12} key={contact.id}>
                                            <ContactCard 
                                                contact={contact} 
                                                listFavo={favourite} 
                                                setFavo={addFavouriteHandler} 
                                                removeFavo={removeFavouriteHandler}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                <Pagination 
                                    color="primary" 
                                    count={Math.ceil(contactList.filter((contact) => !favourite.includes(contact.id)).length/10)} 
                                    page={page} 
                                    onChange={paginationHandler} 
                                    sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
                                />
                            </>
                    ) : (
                            <Typography color="primary" variant="h6" sx={{ textAlign: "center", margin: "auto" }}>No regular contacts</Typography>
                        )}
                    </Container>
                </>
            ) : (<></>)}
            <AddCircleIcon onClick={createContactModalHandler} color="primary" sx={{ position:'fixed', bottom: 30, right: 30, fontSize:60}} />
            <CreateContactModal open={createContact} setOpen={createContactModalHandler} />
        </>

    );
}

export default ContactPage;
