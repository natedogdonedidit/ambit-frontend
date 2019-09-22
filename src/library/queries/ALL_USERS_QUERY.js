import gql from 'graphql-tag';
import { DetailedUser } from 'library/queries/_fragments';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      ...DetailedUser
    }
  }
  ${DetailedUser}
`;

export default ALL_USERS_QUERY;
