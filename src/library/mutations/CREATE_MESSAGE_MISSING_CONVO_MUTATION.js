import { gql } from '@apollo/client';
import { MessageFragment } from 'library/queries/_fragments';

const CREATE_MESSAGE_MISSING_CONVO_MUTATION = gql`
  mutation CREATE_MESSAGE_MISSING_CONVO_MUTATION(
    $content: String!
    $to: ID!
    $from: ID!
    $image: String
    $video: String
    $isShare: Boolean
  ) {
    createOneMessageMissingConvo(content: $content, to: $to, from: $from, image: $image, video: $video, isShare: $isShare) {
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

export default CREATE_MESSAGE_MISSING_CONVO_MUTATION;
