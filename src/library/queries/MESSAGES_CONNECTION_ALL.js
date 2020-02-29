import gql from 'graphql-tag';
import { MessageFragment } from 'library/queries/_fragments';

const MESSAGES_CONNECTION_ALL = gql`
  query MESSAGES_CONNECTION_ALL {
    allMessagesConnections {
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

export default MESSAGES_CONNECTION_ALL;
