import gql from 'graphql-tag';
import { BasicPost } from 'library/queries/_fragments';

const VIEWED_POST_MUTATION = gql`
  mutation VIEWED_POST_MUTATION($postId: ID!) {
    viewedPost(postId: $postId) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default VIEWED_POST_MUTATION;