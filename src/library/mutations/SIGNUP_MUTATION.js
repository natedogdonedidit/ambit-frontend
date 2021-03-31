import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($name: String!, $phone: String!, $username: String!, $password: String!) {
    signup(name: $name, phone: $phone, username: $username, password: $password) {
      token
      user {
        ...MinimalUser
      }
    }
  }
  ${MinimalUser}
`;

export default SIGNUP_MUTATION;
