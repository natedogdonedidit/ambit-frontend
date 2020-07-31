import { gql } from '@apollo/client';
import { UserProfileFragment } from 'library/queries/_fragments';

const EDIT_BIO_MUTATION = gql`
  mutation EDIT_BIO_MUTATION($id: ID!, $data: UserUpdateInput!) {
    editBio(id: $id, data: $data) {
      ...UserProfileFragment
    }
  }
  ${UserProfileFragment}
`;

export default EDIT_BIO_MUTATION;
