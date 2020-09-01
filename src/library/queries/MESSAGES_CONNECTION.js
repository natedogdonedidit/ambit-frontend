import { gql } from '@apollo/client';
import { MessageFragment } from 'library/queries/_fragments';

const MESSAGES_CONNECTION = gql`
  query MESSAGES_CONNECTION(
    $where: MessageWhereInput
    $orderBy: [MessageOrderByInput!]
    $first: Int
    $after: MessageWhereUniqueInput
  ) {
    messages(where: $where, orderBy: $orderBy, first: $first, after: $after) @connection(key: "chat", filter: ["where"]) {
      ...MessageFragment
    }
  }
  ${MessageFragment}
`;

export default MESSAGES_CONNECTION;

// const MESSAGES_CONNECTION = gql`
//   query MESSAGES_CONNECTION($groupID: ID, $cursor: String, $first: Int) {
//     messages(groupID: $groupID, after: $cursor, first: $first) {
//       edges {
//         node {
//           ...MessageFragment
//         }
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//     }
//   }
//   ${MessageFragment}
// `;
