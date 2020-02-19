import gql from 'graphql-tag';
import { BasicChat } from 'library/queries/_fragments';

const ALL_CHATS_QUERY = gql`
  query ALL_CHATS_QUERY {
    allMyChats {
      ...BasicChat
    }
  }
  ${BasicChat}
`;

export default ALL_CHATS_QUERY;
