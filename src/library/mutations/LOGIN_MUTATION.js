import gql from 'graphql-tag';
import { LoggedInUser } from 'library/queries/_fragments';

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...LoggedInUser
      }
    }
  }
  ${LoggedInUser}
`;

export default LOGIN_MUTATION;
