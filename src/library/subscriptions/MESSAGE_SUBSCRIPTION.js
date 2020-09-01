import { gql } from '@apollo/client';
import { MessageFragment } from 'library/queries/_fragments';

const MESSAGE_SUBSCRIPTION = gql`
  subscription MESSAGE_SUBSCRIPTION($userId: ID!) {
    newMessageSub(userId: $userId) {
      ...MessageFragment
    }
  }
  ${MessageFragment}
`;

export default MESSAGE_SUBSCRIPTION;
