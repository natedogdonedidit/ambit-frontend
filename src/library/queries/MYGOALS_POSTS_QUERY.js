import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

export default MYGOALS_POSTS_QUERY = gql`
  query MYGOALS_POSTS_QUERY($after: PostWhereUniqueInput, $first: Int, $where: PostWhereInput, $orderBy: [PostOrderByInput!]) {
    posts(after: $after, first: $first, where: $where, orderBy: $orderBy) @connection(key: "timeline", filter: ["where"]) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;
