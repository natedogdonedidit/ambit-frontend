import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

// id is only used when query the logged in user

const SINGLE_USER_BASIC = gql`
  query SINGLE_USER_BASIC($id: ID, $username: String) {
    user(id: $id, username: $username) {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;

export default SINGLE_USER_BASIC;
