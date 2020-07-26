import { gql } from '@apollo/client';
import { LoggedInUser } from 'library/queries/_fragments';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        ...LoggedInUser
      }
    }
  }
  ${LoggedInUser}
`;

export default SIGNUP_MUTATION;
