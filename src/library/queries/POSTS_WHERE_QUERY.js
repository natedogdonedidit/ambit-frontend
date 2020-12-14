import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

export default POSTS_WHERE_QUERY = gql`
  query POSTS_WHERE_QUERY($where: PostWhereInput!, $cursor: String, $take: Int) {
    postsWhere(where: $where, cursor: $cursor, take: $take) {
      posts {
        ...BasicPost
      }
      hasNextPage
    }
  }
  ${BasicPost}
`;
