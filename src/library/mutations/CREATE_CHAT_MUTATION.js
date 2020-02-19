import gql from 'graphql-tag';
import { DetailedChat } from 'library/queries/_fragments';

const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION($users: [UserWhereUniqueInput]!) {
    createChat(users: $users) {
      ...DetailedChat
    }
  }
  ${DetailedChat}
`;

export default CREATE_CHAT_MUTATION;
