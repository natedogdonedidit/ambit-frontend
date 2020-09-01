import { gql } from '@apollo/client';
import { MessageFragment } from 'library/queries/_fragments';

const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_MESSAGE_MUTATION($content: String!, $to: ID!, $from: ID!, $isNew: Boolean!) {
    createOneMessage(content: $content, to: $to, from: $from, isNew: $isNew) {
      ...MessageFragment
    }
  }
  ${MessageFragment}
`;

// const CREATE_MESSAGE_MUTATION = gql`
//   mutation CREATE_MESSAGE_MUTATION($data: MessageCreateInput!) {
//     createOneMessage(data: $data) {
//       ...MessageFragment
//     }
//   }
//   ${MessageFragment}
// `;

export default CREATE_MESSAGE_MUTATION;
