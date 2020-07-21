import gql from 'graphql-tag';
import { CommentFragment } from 'library/queries/_fragments';

const LIKE_COMMENT_MUTATION = gql`
  mutation LIKE_COMMENT_MUTATION($commentId: ID!) {
    likeComment(commentId: $commentId) {
      ...CommentFragment
    }
  }
  ${CommentFragment}
`;

export default LIKE_COMMENT_MUTATION;
