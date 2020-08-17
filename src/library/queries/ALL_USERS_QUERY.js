import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      username
      name
      profilePic
    }
  }
  ${MinimalUser}
`;

export default ALL_USERS_QUERY;
