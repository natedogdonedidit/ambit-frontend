import { gql } from '@apollo/client';

export default CURRENT_USER_UNREAD = gql`
  query CURRENT_USER_UNREAD {
    userLoggedIn {
      id
      username
      unReadMessagesCount
    }
  }
`;
