import gql from 'graphql-tag';
import { CommentFragment } from 'library/queries/_fragments';

const LIKE_COMMENT = gql`
  mutation LIKE_COMMENT($id: ID!) {
    likeComment(id: $id) {
      ...CommentFragment
    }
  }
  ${CommentFragment}
`;

export default LIKE_COMMENT;
