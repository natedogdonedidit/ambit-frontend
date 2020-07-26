import { gql } from '@apollo/client';
import { MessageFragment } from 'library/queries/_fragments';

const MESSAGES_CONNECTION = gql`
  query MESSAGES_CONNECTION($groupID: ID, $cursor: String, $first: Int) {
    messages(groupID: $groupID, after: $cursor, first: $first) {
      edges {
        node {
          ...MessageFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${MessageFragment}
`;

// const MESSAGES_CONNECTION = gql`
//   query MESSAGES_CONNECTION($id: ID, $cursor: String, $first: Int) {
//     messages(groupID: $id, after: $cursor, first: $first) @connection(key: "group", filter: ["groupID"]) {
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

export default MESSAGES_CONNECTION;
