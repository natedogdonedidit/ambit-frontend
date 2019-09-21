import gql from 'graphql-tag';
import { LoggedInUser } from 'library/queries/_fragments';

export default CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    userLoggedIn {
      ...LoggedInUser
    }
  }
  ${LoggedInUser}
`;
