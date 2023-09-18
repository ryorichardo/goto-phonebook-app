import { gql } from '@apollo/client';

const DELETE_CONTACT = gql`
    mutation MyMutation($id: Int!) {
        delete_contact_by_pk(id: $id) {
        first_name
        last_name
        id
        }
    }  
`;

export default DELETE_CONTACT