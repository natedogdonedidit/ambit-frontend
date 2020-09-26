import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        ...MinimalUser
      }
    }
  }
  ${MinimalUser}
`;

export default LOGIN_MUTATION;
