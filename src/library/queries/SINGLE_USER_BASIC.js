import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

const SINGLE_USER_BASIC = gql`
  query SINGLE_USER_BASIC($id: ID!) {
    user(id: $id) {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;

export default SINGLE_USER_BASIC;
