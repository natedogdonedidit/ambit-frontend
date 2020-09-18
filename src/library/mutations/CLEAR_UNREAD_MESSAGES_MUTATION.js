import { gql } from '@apollo/client';
// import { MessageFragment } from 'library/queries/_fragments';

const CLEAR_UNREAD_MESSAGES_MUTATION = gql`
  mutation CLEAR_UNREAD_MESSAGES_MUTATION($data: MessageUpdateManyMutationInput!, $where: MessageWhereInput) {
    updateManyMessage(data: $data, where: $where) {
      count
    }
  }
`;

export default CLEAR_UNREAD_MESSAGES_MUTATION;
