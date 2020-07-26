import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

export default FORYOU_POSTS_QUERY = gql`
  query FORYOU_POSTS_QUERY($cursor: String, $first: Int, $network: [ID]) {
    postsForYou(after: $cursor, first: $first, network: $network) {
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
