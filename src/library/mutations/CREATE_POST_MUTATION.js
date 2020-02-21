import gql from 'graphql-tag';
import { BasicPost } from 'library/queries/_fragments';

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($owner: ID!, $post: PostCreateInput!) {
    createPost(owner: $owner, post: $post) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default CREATE_POST_MUTATION;
