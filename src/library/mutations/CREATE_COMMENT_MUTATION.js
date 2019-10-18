import gql from 'graphql-tag';
import { DetailPost } from 'library/queries/_fragments';

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($comment: CommentCreateInput!) {
    createComment(comment: $comment) {
      ...DetailPost
    }
  }
  ${DetailPost}
`;

export default CREATE_COMMENT_MUTATION;
