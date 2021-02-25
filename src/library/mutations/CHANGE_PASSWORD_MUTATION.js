import { gql } from '@apollo/client';

const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD_MUTATION($username: String!, $password: String!) {
    changePassword(username: $username, password: $password) {
      id
      username
    }
  }
`;

export default CHANGE_PASSWORD_MUTATION;
