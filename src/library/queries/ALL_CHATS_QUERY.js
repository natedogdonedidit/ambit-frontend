import gql from 'graphql-tag';
import { AllChats } from 'library/queries/_fragments';

const ALL_CHATS_QUERY = gql`
  query ALL_CHATS_QUERY {
    allMyChats {
      ...AllChats
    }
  }
  ${AllChats}
`;

export default ALL_CHATS_QUERY;
