import gql from 'graphql-tag';

export default UNREAD_MESSAGES_QUERY = gql`
  query UNREAD_MESSAGES_QUERY {
    unReadMessagesCount {
      unReadMessagesCount
    }
  }
`;
