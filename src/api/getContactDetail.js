import { gql } from '@apollo/client';

const GET_CONTACT_DETAIL = gql`
  query GetContactDetail($id: Int!){
      contact_by_pk(id: $id) {
      last_name
      id
      first_name
      created_at
      phones {
        number
      }
    }
  }
`;

export default GET_CONTACT_DETAIL