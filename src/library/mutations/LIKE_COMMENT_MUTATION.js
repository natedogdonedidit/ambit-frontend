import { gql } from '@apollo/client';
import { CommentFragment } from 'library/queries/_fragments';

const LIKE_COMMENT_MUTATION = gql`
  mutation LIKE_COMMENT_MUTATION($where: CommentWhereUniqueInput!, $data: CommentUpdateInput!) {
    likeComment(where: $where, data: $data) {
      ...CommentFragment
    }
  }
  ${CommentFragment}
`;

export default LIKE_COMMENT_MUTATION;
