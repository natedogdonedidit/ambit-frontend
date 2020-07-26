import { gql } from '@apollo/client';

export default UNREAD_MESSAGES_QUERY = gql`
  query UNREAD_MESSAGES_QUERY {
    unReadMessagesCount {
      unReadMessagesCount
    }
  }
`;
