import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

// id is only used when query the logged in user

export default USER_POSTS_QUERY = gql`
  query USER_POSTS_QUERY($id: ID, $username: String) {
    postsUser(id: $id, username: $username) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;
