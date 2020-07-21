import gql from 'graphql-tag';
import { CommentFragment } from 'library/queries/_fragments';

const UNLIKE_COMMENT_MUTATION = gql`
  mutation UNLIKE_COMMENT_MUTATION($commentId: ID!) {
    unlikeComment(commentId: $commentId) {
      ...CommentFragment
    }
  }
  ${CommentFragment}
`;

export default UNLIKE_COMMENT_MUTATION;
