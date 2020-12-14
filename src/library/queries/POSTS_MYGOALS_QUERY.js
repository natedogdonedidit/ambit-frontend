import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

export default POSTS_MYGOALS_QUERY = gql`
  query POSTS_MYGOALS_QUERY($feed: String!, $cursor: String, $take: Int) {
    postsMyGoals(feed: $feed, cursor: $cursor, take: $take) {
      posts {
        ...BasicPost
      }
      hasNextPage
    }
  }
  ${BasicPost}
`;
