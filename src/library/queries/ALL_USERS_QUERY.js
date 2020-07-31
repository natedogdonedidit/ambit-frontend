import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;

export default ALL_USERS_QUERY;
