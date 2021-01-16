import { gql } from '@apollo/client';
import { UserWithMessages } from 'library/queries/_fragments';

export default CURRENT_USER_CONVOS = gql`
  query CURRENT_USER_CONVOS {
    userLoggedIn {
      ...UserWithMessages
    }
  }
  ${UserWithMessages}
`;
