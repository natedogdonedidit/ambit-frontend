import { gql } from '@apollo/client';
import { UserWithMessages } from 'library/queries/_fragments';

const CLEAR_UNREAD_MESSAGES_MUTATION = gql`
  mutation CLEAR_UNREAD_MESSAGES_MUTATION($groupID: ID) {
    clearUnReadMessages(groupID: $groupID) {
      ...UserWithMessages
    }
  }
  ${UserWithMessages}
`;

export default CLEAR_UNREAD_MESSAGES_MUTATION;
