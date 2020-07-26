import { gql } from '@apollo/client';
import { LoggedInUser } from 'library/queries/_fragments';

const EDIT_BIO_MUTATION = gql`
  mutation EDIT_BIO_MUTATION($id: ID!, $data: UserUpdateInput!) {
    editBio(id: $id, data: $data) {
      ...LoggedInUser
    }
  }
  ${LoggedInUser}
`;

export default EDIT_BIO_MUTATION;
