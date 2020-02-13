import gql from 'graphql-tag';
import { DetailedChat } from 'library/queries/_fragments';

const FULL_CHAT_QUERY = gql`
  query FULL_CHAT_QUERY($id: ID!) {
    fullChat(id: $id) {
      ...DetailedChat
    }
  }
  ${DetailedChat}
`;

export default FULL_CHAT_QUERY;
