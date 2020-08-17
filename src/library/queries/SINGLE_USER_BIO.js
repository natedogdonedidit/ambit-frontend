import { gql } from '@apollo/client';
import { UserProfileFragment } from 'library/queries/_fragments';

// id is only used when query the logged in user

const SINGLE_USER_BIO = gql`
  query SINGLE_USER_BIO($id: ID, $username: String) {
    user(id: $id, username: $username) {
      ...UserProfileFragment
    }
  }
  ${UserProfileFragment}
`;

export default SINGLE_USER_BIO;
