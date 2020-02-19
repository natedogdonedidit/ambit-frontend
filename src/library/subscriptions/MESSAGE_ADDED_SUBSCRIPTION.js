import gql from 'graphql-tag';
import { MessageFragment } from 'library/queries/_fragments';

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription MESSAGE_ADDED_SUBSCRIPTION($chatID: ID!) {
    messageAdded(chatID: $chatID) {
      ...MessageFragment
    }
  }
  ${MessageFragment}
`;

export default MESSAGE_ADDED_SUBSCRIPTION;
