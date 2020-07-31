import { gql } from '@apollo/client';
import { UserProfileFragment } from 'library/queries/_fragments';

const SINGLE_USER_BIO = gql`
  query SINGLE_USER_BIO($id: ID!) {
    user(id: $id) {
      ...UserProfileFragment
    }
  }
  ${UserProfileFragment}
`;

export default SINGLE_USER_BIO;
