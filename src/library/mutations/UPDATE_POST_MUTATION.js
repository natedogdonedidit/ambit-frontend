import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION($owner: ID!, $postID: ID!, $post: PostUpdateInput!) {
    updatePost(owner: $owner, postID: $postID, post: $post) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default UPDATE_POST_MUTATION;
