import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';

import { Card, Container, Grid, Stack } from '@mui/material';

import { gridSpacing } from '../configs/constant';


import ContactCard from './components/ContactCard';

import GET_CONTACT_LIST from '../api/getContactList';

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
    console.log(data)

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
                <Grid container spacing={gridSpacing}>
                    {data.contact.map((contact) => (
                        <Grid item xl={12} lg={12} md={12} xs={12} key={contact.id}>
                            <ContactCard contact={contact} />
                        </Grid>
                    ))}
                </Grid>
            ) : (<></>)}
        </Container>

    );
}

export default ContactPage;
