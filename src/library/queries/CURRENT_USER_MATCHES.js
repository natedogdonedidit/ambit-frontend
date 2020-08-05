import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

export default CURRENT_USER_MATCHES = gql`
  query CURRENT_USER_MATCHES {
    myMatches {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;
