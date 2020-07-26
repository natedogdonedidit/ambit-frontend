import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

export default MYGOALS_POSTS_QUERY = gql`
  query MYGOALS_POSTS_QUERY($cursor: String, $first: Int) {
    postsMyGoals(after: $cursor, first: $first) {
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
