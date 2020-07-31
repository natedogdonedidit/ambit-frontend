import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

export default CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    userLoggedIn {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;
