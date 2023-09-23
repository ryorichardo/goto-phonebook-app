import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { gridSpacing } from '../configs/constant';

import GET_CONTACT_LIST from '../api/getContactList';

import ContactCard from './components/ContactCard';
import CreateContactModal from './components/CreateContactModal';
import ContactDetail from './components/ContactDetail';
import DeleteModal from './components/DeleteModal';
import FavouriteContactCard from './components/FavouriteContactCard';

import { Search, SearchIconWrapper, StyledInputBase } from '../App';

function DesktopContactPage() {

    const { data, refetch } = useQuery(GET_CONTACT_LIST);

    const [createCard, setCreateCard] = useState(false)
    const [page, setPage] = useState(1)
    const [contactList, setContactList] = useState([])
    const [favourite, setFavourite] = useState([])
    const [selectedContact, setSelectedContact] = useState()
    const [detailCard, setDetailCard] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [search, setSearch] = useState()
    const [edit, setEdit] = useState(false);

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
        if (search) {
            setPage(1)
        }
    }, [search])

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

    const openDetailCardHandler = () => {
        setEdit(false)
        setDetailCard(true)
        setCreateCard(false)
    }

    const closeDetailCardHandler = () => {
        setEdit(false)
        setDetailCard(false)
        setCreateCard(false)
    }

    const deleteModalHandler = () => {
        setDeleteModal(current => !current)
    }

    const openCreateContactCardHandler = () => {
        setCreateCard(true)
        setDetailCard(false)
    }

    const closeCreateContactCardHandler = () => {
        setCreateCard(false)
        setDetailCard(false)
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
        <Grid container sx={{ padding: "0 !important" }}>
            <Grid item sm={6}>
                <Container sx={{ width: "50% !important", position: "fixed", top: "70px", zIndex: 2, backgroundColor: "#1776D2", padding: 2 }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: "white" }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ color: "white" }}
                        />
                    </Search>
                </Container>
                {contactList?.filter((contact) => favourite.includes(contact.id)).length > 0? (
                    <Container sx={{ backgroundColor: "#1776D2" }}>
                        <Container sx={{ position: "sticky", top: "125px", paddingTop:"10px", paddingLeft: "8px !important", backgroundColor: "#1776D2", zIndex: 1 }}>
                            <Typography color="white" variant="h6">Favourite contacts</Typography>
                        </Container>
                        <Container sx={{ padding: "0 !important", marginTop: 16, height: "100%" }}>
                            <FavouriteContactCard 
                                contacts={contactList.filter((contact) => favourite.includes(contact.id) && filterSearchHandler(contact))} 
                                setSelectedContact={setSelectedContact}
                                setDetailModal={openDetailCardHandler}
                            />
                        </Container>
                    </Container>
                ) : (<></>)}
                <Container sx={{ position: "sticky", top: "125px", paddingTop:"10px", paddingLeft: "0 !important", paddingRight: "0 !important", backgroundColor: "#1776D2", zIndex: 1 }}>
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
                                            setDetailModal={openDetailCardHandler}
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
            </Grid>
            <Grid item sm={6} sx={{ backgroundColor: "#1776D2" }}>
                <Container sx={{ position:"fixed", left: { xs: "405px", md: "555px", lg: "935px" }, padding: 4, width: "auto", display:"block:", top: "55%", transform: "translateY(-50%)" }}>
                    {createCard ? (
                        <CreateContactModal open={createCard} setOpen={closeCreateContactCardHandler} refetch={refetch} />
                    ) : (<></>)}
                    {detailCard ? (
                        <ContactDetail
                            open={detailCard}
                            setOpen={closeDetailCardHandler}
                            edit={edit}
                            setEdit={setEdit}
                            contact={selectedContact}
                            listFavo={favourite}
                            setFavo={addFavouriteHandler}
                            removeFavo={removeFavouriteHandler}
                            refetch={refetch}
                        />
                    ) : (<></>)}
                    {!createCard && !detailCard ? (
                        <Container sx={{ marginLeft: 0, textAlign: "center", width: "auto" }}>
                            <Typography color="rgb(255,255,255,0.75)" variant="h6">Press contact profile to see the details</Typography>
                        </Container>
                    ) : (<></>)}
                </Container>
            </Grid>
            <AddCircleIcon onClick={openCreateContactCardHandler} color="primary" sx={{ position:'fixed', bottom: 15, left: { xs: "315px", md: "435px", lg: "685px" }, fontSize:60}} />
            <DeleteModal
                open={deleteModal}
                setOpen={deleteModalHandler}
                contact={selectedContact}
                refetch={refetch}
            />
        </Grid >

    );
}

export default DesktopContactPage;
