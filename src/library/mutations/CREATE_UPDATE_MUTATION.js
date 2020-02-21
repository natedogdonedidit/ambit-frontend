import gql from 'graphql-tag';
import { BasicPost } from 'library/queries/_fragments';

const CREATE_UPDATE_MUTATION = gql`
  mutation CREATE_UPDATE_MUTATION($postId: ID!, $update: UpdateCreateWithoutParentPostInput!) {
    createUpdate(postId: $postId, update: $update) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default CREATE_UPDATE_MUTATION;
