import gql from 'graphql-tag';
import { BasicPost } from 'library/queries/_fragments';

const UNLIKE_POST_MUTATION = gql`
  mutation UNLIKE_POST_MUTATION($postId: ID!) {
    unlikePost(postId: $postId) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default UNLIKE_POST_MUTATION;
