import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

export default POSTS_FOLLOWING_QUERY = gql`
  query POSTS_FOLLOWING_QUERY($feed: String!, $cursor: String, $take: Int) {
    postsFollowing(feed: $feed, cursor: $cursor, take: $take) {
      posts {
        ...BasicPost
      }
      hasNextPage
    }
  }
  ${BasicPost}
`;
