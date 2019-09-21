import gql from 'graphql-tag';
import { ListPosts } from 'library/queries/_fragments';

const LIKE_POST = gql`
  mutation LIKE_POST($postId: ID!) {
    likePost(postId: $postId) {
      ...ListPosts
    }
  }
  ${ListPosts}
`;

export default LIKE_POST;
