import gql from 'graphql-tag';
import { ListPosts } from 'library/queries/_fragments';

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($owner: ID!, $post: PostCreateInput!) {
    createPost(owner: $owner, post: $post) {
      ...ListPosts
    }
  }
  ${ListPosts}
`;

export default CREATE_POST_MUTATION;
