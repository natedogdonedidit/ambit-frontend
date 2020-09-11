import { gql } from '@apollo/client';
import { CommentFragment } from 'library/queries/_fragments';

const UNLIKE_COMMENT_MUTATION = gql`
  mutation UNLIKE_COMMENT_MUTATION($where: CommentWhereUniqueInput!, $data: CommentUpdateInput!) {
    unlikeComment(where: $where, data: $data) {
      ...CommentFragment
    }
  }
  ${CommentFragment}
`;

export default UNLIKE_COMMENT_MUTATION;
