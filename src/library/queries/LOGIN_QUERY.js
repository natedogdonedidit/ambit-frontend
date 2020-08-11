import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

const LOGIN_QUERY = gql`
  query LOGIN_QUERY($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        ...MinimalUser
      }
    }
  }
  ${MinimalUser}
`;

export default LOGIN_QUERY;
