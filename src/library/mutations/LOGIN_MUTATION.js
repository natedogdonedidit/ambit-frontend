import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        name
        email
        profilePic
        location
        locationLat
        locationLon
      }
    }
  }
`;

export default LOGIN_MUTATION;
