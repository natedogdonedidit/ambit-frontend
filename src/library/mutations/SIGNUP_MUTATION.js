import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($name: String!, $email: String!, $username: String!, $password: String!) {
    signup(name: $name, email: $email, username: $username, password: $password) {
      token
      user {
        ...MinimalUser
      }
    }
  }
  ${MinimalUser}
`;

export default SIGNUP_MUTATION;
