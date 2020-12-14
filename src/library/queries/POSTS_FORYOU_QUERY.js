import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

export default POSTS_FORYOU_QUERY = gql`
  query POSTS_FORYOU_QUERY($feed: String!, $cursor: String, $take: Int) {
    postsForYou(feed: $feed, cursor: $cursor, take: $take) {
      posts {
        ...BasicPost
      }
      hasNextPage
    }
  }
  ${BasicPost}
`;

// export default POSTS_FORYOU_QUERY = gql`
//   query POSTS_FORYOU_QUERY($after: PostWhereUniqueInput, $first: Int, $where: PostWhereInput, $orderBy: [PostOrderByInput!]) {
//     posts(after: $after, first: $first, where: $where, orderBy: $orderBy) @connection(key: "timeline", filter: ["where"]) {
//       ...BasicPost
//     }
//   }
//   ${BasicPost}
// `;
