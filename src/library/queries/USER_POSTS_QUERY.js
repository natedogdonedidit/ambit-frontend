import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

export default USER_POSTS_QUERY = gql`
  query USER_POSTS_QUERY($id: ID!) {
    postsUser(id: $id) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;
