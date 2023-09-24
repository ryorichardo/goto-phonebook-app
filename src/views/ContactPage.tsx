import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { Container, Grid, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SearchIcon from '@mui/icons-material/Search';
import { contact, gridSpacing } from '../configs/constant';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

import GET_CONTACT_LIST from '../api/getContactList';

import ContactCard from './components/ContactCard';
import CreateContactModal from './components/CreateContactModal';
import ContactDetail from './components/ContactDetail';
import DeleteModal from './components/DeleteModal';
import FavouriteContactCard from './components/FavouriteContactCard';

import { Search, SearchIconWrapper, StyledInputBase } from '../App';
import React from 'react';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
        borderRadius: '15px !important'
    }
  }));

function ContactPage() {

    const { data, refetch } = useQuery(GET_CONTACT_LIST, {
        variables: {
            order_by: {
                first_name: "asc",
                last_name: "asc"
            }
        }
    });

    const [createModal, setCreateModal] = useState(false)
    const [page, setPage] = useState(1)
    const [contactList, setContactList] = useState([])
    const [favourite, setFavourite] = useState<number[]>([])
    const [selectedContact, setSelectedContact] = useState<contact>({
        id: 0,
        first_name: '',
        last_name: '',
        phones: []
    })
    const [detailModal, setDetailModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [edit, setEdit] = useState(false);
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (localStorage.getItem('list_contact') && localStorage.getItem('list_contact') !== 'undefined') {
            const list_contact = JSON.parse(localStorage.getItem('list_contact')!)
            setContactList(list_contact)
        } else if (data) {
            setContactList(data?.contact)
            localStorage.setItem('list_contact', JSON.stringify(data?.contact))
        }
    }, [page, data]);

    useEffect(() => {
        if (refetch) {
            console.log(refetch)
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
            const list_favourite = JSON.parse(localStorage.getItem('list_favourite')!)
            setFavourite(list_favourite)
        } else {
            localStorage.setItem('list_favourite', JSON.stringify([]))
        }
    }, [])

    const addFavouriteHandler = (id: number) => {
        if (!favourite.includes(id)) {
            setFavourite([...favourite, id]);
            localStorage.setItem('list_favourite', JSON.stringify([...favourite, id]))
        }

        // set back page when current page has no other contact left
        if (page > Math.ceil((contactList.filter((contact: contact) => !favourite.includes(contact.id)).length - 1)/10)) {
            setPage(page-1)
        }
    }

    const removeFavouriteHandler = (id: number) => {
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

    const paginationHandler = (_: any, newPage: number) => {
        setPage(newPage)
        setContactList(data?.contact.slice((newPage-1)*10, Math.min(data.contact.length, newPage*10)))
    }

    const filterSearchHandler = (contact: contact) => {
        return (search === undefined ||
                contact.first_name.toLowerCase().includes(search.toLowerCase()) ||
                contact.last_name.toLowerCase().includes(search.toLowerCase()) ||
                (contact.first_name.toLowerCase() + " " + contact.last_name.toLowerCase()).includes(search.toLowerCase()))
    }

    return (
        <>
            <Container sx={{ position: "fixed", top: "70px", zIndex: 2, backgroundColor: "#1776D2", padding: 2 }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon sx={{ color: "white" }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ color: "white", width:"inherit" }}
                    />
                </Search>
            </Container>
            {contactList?.filter((contact: contact) => favourite.includes(contact.id)).length > 0? (
                <Container sx={{ backgroundColor: "#1776D2" }}>
                    <Container sx={{ position: "sticky", top: "125px", paddingTop:"10px", backgroundColor: "#1776D2", zIndex: 1 }}>
                        <Typography color="white" variant="h6">Favourite contacts</Typography>
                    </Container>
                    <FavouriteContactCard 
                        contacts={contactList.filter((contact: contact) => favourite.includes(contact.id) && filterSearchHandler(contact))} 
                        setSelectedContact={setSelectedContact}
                        setDetailModal={setDetailModal}
                    />
                </Container>
            ) : (<></>)}
            <Container sx={{ position: "sticky", top: "125px", paddingTop:"10px", paddingLeft: 0, paddingRight: 0, backgroundColor: "#1776D2", zIndex: 1 }}>
                <Typography color="white" variant="h6" sx={{ paddingLeft: "32px" }}>Contacts</Typography>
                <Container sx ={{ backgroundColor: "#fafafa", height: "30px", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}></Container>
            </Container>
            <Container sx={{ backgroundColor: "#fafafa", paddingBottom: 2, marginTop: contactList?.filter((contact: contact) => favourite.includes(contact.id)).length ? 0 : 7, minHeight: "45vh" }}>
                {contactList?.filter((contact: contact) => !favourite.includes(contact.id) && filterSearchHandler(contact)).length > 0? (
                    <>
                        <Grid container spacing={gridSpacing}>
                            {contactList?.filter((contact: contact) => !favourite.includes(contact.id) && filterSearchHandler(contact))
                                .slice((page-1)*10, Math.min(contactList?.length, page*10))
                                .map((contact: contact) => (
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
                            count={Math.ceil(contactList?.filter((contact: contact) => !favourite.includes(contact.id) && filterSearchHandler(contact)).length/10)} 
                            page={page} 
                            onChange={paginationHandler} 
                            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
                        />
                    </>
            ) : (
                    <Typography color="primary" variant="h6" sx={{ textAlign: "center", margin: "auto", marginTop: "25vh" }}>No regular contacts</Typography>
                )}
            </Container>
            <AddCircleRoundedIcon onClick={createContactModalHandler} color="primary" sx={{ backgroundColor: "white", borderRadius: 40, position:'fixed', bottom: 30, right: 30, fontSize:60}} />
            <BootstrapDialog open={createModal} onClose={createContactModalHandler}>
                <CreateContactModal setOpen={createContactModalHandler} refetch={refetch} listContact={contactList} />
            </BootstrapDialog>
            <BootstrapDialog open={detailModal} onClose={detailModalHandler}>
                <ContactDetail
                    setOpen={detailModalHandler}
                    edit={edit}
                    setEdit={setEdit}
                    contact={selectedContact}
                    listFavo={favourite}
                    setFavo={addFavouriteHandler}
                    removeFavo={removeFavouriteHandler}
                    refetch={refetch}
                    listContact={contactList} 
                />
            </BootstrapDialog>
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
