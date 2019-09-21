import gql from 'graphql-tag';
import { ListPosts } from 'library/queries/_fragments';

const CREATE_UPDATE_MUTATION = gql`
  mutation CREATE_UPDATE_MUTATION($postId: ID!, $update: UpdateCreateWithoutParentPostInput!) {
    createUpdate(postId: $postId, update: $update) {
      ...ListPosts
    }
  }
  ${ListPosts}
`;

export default CREATE_UPDATE_MUTATION;
