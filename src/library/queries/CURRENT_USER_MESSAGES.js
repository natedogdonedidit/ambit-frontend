import { gql } from '@apollo/client';
import { UserWithMessages } from 'library/queries/_fragments';

export default CURRENT_USER_MESSAGES = gql`
  query CURRENT_USER_MESSAGES {
    userLoggedIn {
      ...UserWithMessages
    }
  }
  ${UserWithMessages}
`;
