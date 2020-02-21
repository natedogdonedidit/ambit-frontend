import gql from 'graphql-tag';
import { BasicPost } from 'library/queries/_fragments';

export default GLOBAL_POSTS_QUERY = gql`
  query GLOBAL_POSTS_QUERY($cursor: String) {
    postsGlobal(after: $cursor) {
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
