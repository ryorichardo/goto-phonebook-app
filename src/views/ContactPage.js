import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';

import { Card, Container, Grid, Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { gridSpacing } from '../configs/constant';

import ContactCard from './components/ContactCard';

import GET_CONTACT_LIST from '../api/getContactList';
import client from '../api';

import CreateContactModal from './components/CreateContactModal';

function ContactPage() {
    const { id } = useParams();
    // const [contact, setContact] = useState();

    const { loading, error, data, refetch } = useQuery(GET_CONTACT_LIST, {
        variables: {
            // "where":  {
            //     "first_name": {"_like": "%Dedi%" }
            // }
        }
    });

    const [allList, setAllList] = useState(data)
    const [createContact, setCreateContact] = useState(false)
    const [page, setPage] = useState(1)
    const [contactList, setContactList] = useState([])

    useEffect(() => {
        if (data) {
            setContactList(data?.contact.slice(0, Math.min(data.contact.length, 10)))
        }
    }, [data]);

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

    // const getContactList = () => {
    //     const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    //         variables: {
    //             // "where":  {
    //             //     "first_name": {"_like": "%Dedi%" }
    //             // }
    //         }
    //     });

    //     setContact(data?.contact);
    // }
    

    // useEffect(() => {
    //     GetContactList();
    // }, []);

    return (
        <Container>
            {data? (
                <>
                    <Grid container spacing={gridSpacing}>
                        {contactList.map((contact) => (
                            <Grid item xl={12} lg={12} md={12} xs={12} key={contact.id}>
                                <ContactCard contact={contact} />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination color="error" count={Math.ceil(data.contact.length/10)} page={page} onChange={paginationHandler} sx={{ marginTop: 2, justifyItems:'center' }}/>
                </>
            ) : (<></>)}
            <AddCircleIcon onClick={createContactModalHandler} color="error" sx={{ position:'fixed', bottom: 30, right: 30, fontSize:60}} />
            <CreateContactModal open={createContact} setOpen={createContactModalHandler} refetch={refetch} />
        </Container>

    );
}

export default ContactPage;
