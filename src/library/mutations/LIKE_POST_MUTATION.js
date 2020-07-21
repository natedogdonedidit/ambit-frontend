import gql from 'graphql-tag';
import { BasicPost } from 'library/queries/_fragments';

const LIKE_POST_MUTATION = gql`
  mutation LIKE_POST($postId: ID!) {
    likePost(postId: $postId) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default LIKE_POST_MUTATION;
