import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

export default CURRENT_USER_QUERY_HEADER = gql`
  query CURRENT_USER_QUERY_HEADER {
    userLoggedIn {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;
