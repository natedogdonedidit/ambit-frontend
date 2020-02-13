import gql from 'graphql-tag';
import { DetailedChat } from 'library/queries/_fragments';

const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_POST_MUTATION($message: MessageCreateInput!) {
    createMessage(message: $message) {
      ...DetailedChat
    }
  }
  ${DetailedChat}
`;

export default CREATE_MESSAGE_MUTATION;
