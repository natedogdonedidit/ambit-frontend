import gql from 'graphql-tag';

export default CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    userLoggedIn {
      id
      firstName
      lastName
      email
    }
  }
`;
