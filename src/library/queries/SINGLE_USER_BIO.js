import { gql } from '@apollo/client';
import { DetailedUser } from 'library/queries/_fragments';

const SINGLE_USER_BIO = gql`
  query SINGLE_USER_BIO($id: ID!) {
    user(id: $id) {
      ...DetailedUser
    }
  }
  ${DetailedUser}
`;

export default SINGLE_USER_BIO;
