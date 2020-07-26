import { gql } from '@apollo/client';
import { CommentFragment } from 'library/queries/_fragments';

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($comment: CommentCreateInput!) {
    createComment(comment: $comment) {
      ...CommentFragment
    }
  }
  ${CommentFragment}
`;

export default CREATE_COMMENT_MUTATION;
