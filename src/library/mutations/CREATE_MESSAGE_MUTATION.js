import { gql } from '@apollo/client';
import { MessageFragment } from 'library/queries/_fragments';

const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_MESSAGE_MUTATION($message: MessageCreateInput!) {
    createMessage(message: $message) {
      ...MessageFragment
    }
  }
  ${MessageFragment}
`;

export default CREATE_MESSAGE_MUTATION;
