import gql from 'graphql-tag';
import { BasicPost } from 'library/queries/_fragments';

export default FORYOU_POSTS_QUERY = gql`
  query FORYOU_POSTS_QUERY($cursor: String, $first: Int) {
    postsForYou(after: $cursor, first: $first) {
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
