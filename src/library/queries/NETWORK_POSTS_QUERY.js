import gql from 'graphql-tag';
import { BasicPost } from 'library/queries/_fragments';

export default NETWORK_POSTS_QUERY = gql`
  query NETWORK_POSTS_QUERY($cursor: String, $first: Int, $network: [ID]) {
    postsNetwork(after: $cursor, first: $first, network: $network) @connection(key: "NETWORK_POSTS_KEY") {
      edges {
        node {
          ...BasicPost
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${BasicPost}
`;
