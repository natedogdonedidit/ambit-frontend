import { gql } from '@apollo/client';

export default CURRENT_USER_APN_TOKEN = gql`
  query CURRENT_USER_APN_TOKEN {
    userApnToken {
      id
      username
      apnToken
    }
  }
`;