import gql from 'graphql-tag';
import { DetailedUser } from 'library/queries/_fragments';

const EDIT_BIO_MUTATION = gql`
  mutation EDIT_BIO_MUTATION($id: ID!, $data: UserUpdateInput!) {
    editBio(id: $id, data: $data) {
      ...DetailedUser
    }
  }
  ${DetailedUser}
`;

export default EDIT_BIO_MUTATION;
