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
import ContactDetail from './components/ContactDetail';
import DeleteModal from './components/DeleteModal';
import FavouriteContactCard from './components/FavouriteContactCard';

function ContactPage({ search }) {

    const { data, refetch } = useQuery(GET_CONTACT_LIST);

    const [createModal, setCreateModal] = useState(false)
    const [page, setPage] = useState(1)
    const [contactList, setContactList] = useState([])
    const [favourite, setFavourite] = useState([])
    const [selectedContact, setSelectedContact] = useState()
    const [detailModal, setDetailModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('list_contact') && localStorage.getItem('list_contact') !== 'undefined') {
            const list_contact = JSON.parse(localStorage.getItem('list_contact'))
            setContactList(list_contact)
        } else if (data) {
            setContactList(data?.contact)
            localStorage.setItem('list_contact', JSON.stringify(data?.contact))
        }
    }, [page, data]);

    useEffect(() => {
        if (refetch) {
            setContactList(data?.contact)
            localStorage.setItem('list_contact', JSON.stringify(data?.contact))
        }
    }, [data, refetch])

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

        // set back page when current page has no other contact left
        if (page > Math.ceil((contactList.filter((contact) => !favourite.includes(contact.id)).length - 1)/10)) {
            setPage(page-1)
        }
    }

    const removeFavouriteHandler = (id) => {
        if (favourite.includes(id)) {
            setFavourite(favourite.filter((el) => el !== id));
            localStorage.setItem('list_favourite', JSON.stringify(favourite.filter((el) => el !== id)))
        }
    }

    const detailModalHandler = () => {
        setDetailModal(current => !current)
    }

    const deleteModalHandler = () => {
        setDeleteModal(current => !current)
    }

    const createContactModalHandler = () => {
        setCreateModal(current => !current)
    }

    const paginationHandler = (event, newPage) => {
        setPage(newPage)
        setContactList(data?.contact.slice((newPage-1)*10, Math.min(data.contact.length, newPage*10)))
    }

    const filterSearchHandler = (contact) => {
        return (search === undefined ||
                contact.first_name.toLowerCase().includes(search) ||
                contact.last_name.toLowerCase().includes(search) ||
                (contact.first_name.toLowerCase() + " " + contact.last_name.toLowerCase()).includes(search))
    }

    return (
        <>
            {contactList?.filter((contact) => favourite.includes(contact.id)).length > 0? (
                <Container sx={{ backgroundColor: "#1776D2" }}>
                    <Container sx={{ position: "sticky", top: "115px", paddingTop:"10px", backgroundColor: "#1776D2", zIndex: 1 }}>
                        <Typography color="white" variant="h6">Favourite contacts</Typography>
                    </Container>
                    <FavouriteContactCard 
                        contacts={contactList.filter((contact) => favourite.includes(contact.id) && filterSearchHandler(contact))} 
                        setSelectedContact={setSelectedContact}
                        setDetailModal={setDetailModal}
                    />
                </Container>
            ) : (<></>)}
            <Container sx={{ position: "sticky", top: "115px", paddingTop:"10px", paddingLeft: 0, paddingRight: 0, backgroundColor: "#1776D2", zIndex: 1 }}>
                <Typography color="white" variant="h6" sx={{ paddingLeft: "32px" }}>Contacts</Typography>
                <Container sx ={{ backgroundColor: "#fafafa", height: "30px", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}></Container>
            </Container>
            <Container sx={{ backgroundColor: "#fafafa", paddingBottom: 2, marginTop: contactList?.filter((contact) => favourite.includes(contact.id)).length ? 0 : 4, minHeight: "45vh" }}>
                {contactList?.filter((contact) => !favourite.includes(contact.id) && filterSearchHandler(contact)).length > 0? (
                    <>
                        <Grid container spacing={gridSpacing}>
                            {contactList?.filter((contact) => !favourite.includes(contact.id) && filterSearchHandler(contact))
                                .slice((page-1)*10, Math.min(contactList?.length, page*10))
                                .map((contact) => (
                                <Grid item xl={12} lg={12} md={12} xs={12} key={contact.id}>
                                    <ContactCard 
                                        contact={contact} 
                                        setFavo={addFavouriteHandler}
                                        setSelectedContact={setSelectedContact}
                                        setDetailModal={setDetailModal}
                                        setDeleteModal={setDeleteModal}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Pagination 
                            color="primary" 
                            count={Math.ceil(contactList?.filter((contact) => !favourite.includes(contact.id) && filterSearchHandler(contact)).length/10)} 
                            page={page} 
                            onChange={paginationHandler} 
                            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
                        />
                    </>
            ) : (
                    <Typography color="primary" variant="h6" sx={{ textAlign: "center", margin: "auto", marginTop: "25vh" }}>No regular contacts</Typography>
                )}
            </Container>
            <AddCircleIcon onClick={createContactModalHandler} color="primary" sx={{ position:'fixed', bottom: 30, right: 30, fontSize:60}} />
            <CreateContactModal open={createModal} setOpen={createContactModalHandler} refetch={refetch} />
            <ContactDetail
                open={detailModal}
                setOpen={detailModalHandler}
                contact={selectedContact}
                listFavo={favourite}
                setFavo={addFavouriteHandler}
                removeFavo={removeFavouriteHandler}
                refetch={refetch}
            />
            <DeleteModal
                open={deleteModal}
                setOpen={deleteModalHandler}
                contact={selectedContact}
                refetch={refetch}
            />
        </>

    );
}

export default ContactPage;
