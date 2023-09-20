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

    // useEffect(() => {
    //     localStorage.setItem('list_favourite', JSON.stringify(favourite))
    // }, [favourite])

    const addFavouriteHandler = (id) => {
        console.log('asd')
        if (!favourite.includes(id)) {
            setFavourite([...favourite, id]);
            localStorage.setItem('list_favourite', JSON.stringify(favourite))
        }
    }

    // const refetchData = async () => {
    //     const result = await client.refetchQueries({
    //         include: GET_CONTACT_LIST,
    //     });
    //     return result
    // }

    // useEffect(() => {
    //     if (!createContact) {
    //         const data = refetchData()
    //         console.log(data)
    //         setAllList(data)
    //     }
    // }, [createContact])

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
                        <Typography color="white" variant="h6">Favourite contacts</Typography>
                        <HorizontalGrid contacts={contactList.filter((contact) => favourite.includes(contact.id))} />
                    </Container>
                    <Container sx={{ backgroundColor: "#fafafa", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                        <Grid container spacing={gridSpacing}>
                            {contactList.map((contact) => (
                                <Grid item xl={12} lg={12} md={12} xs={12} key={contact.id}>
                                    <ContactCard contact={contact} setFavo={addFavouriteHandler(contact.id)} />
                                </Grid>
                            ))}
                        </Grid>
                        <Pagination color="primary" count={Math.ceil(allContact.contact.length/10)} page={page} onChange={paginationHandler} sx={{ marginTop: 2 }}/>
                    </Container>
                </>
            ) : (<></>)}
            <AddCircleIcon onClick={createContactModalHandler} color="primary" sx={{ position:'fixed', bottom: 30, right: 30, fontSize:60}} />
            <CreateContactModal open={createContact} setOpen={createContactModalHandler} />
        </>

    );
}

export default ContactPage;
