import { gql } from '@apollo/client';
import { LoggedInUser } from 'library/queries/_fragments';

const CLEAR_UNREAD_MESSAGES_MUTATION = gql`
  mutation CLEAR_UNREAD_MESSAGES_MUTATION($groupID: ID) {
    clearUnReadMessages(groupID: $groupID) {
      ...LoggedInUser
    }
  }
  ${LoggedInUser}
`;

export default CLEAR_UNREAD_MESSAGES_MUTATION;
