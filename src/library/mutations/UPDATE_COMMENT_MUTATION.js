import { gql } from '@apollo/client';
import { CommentFragment } from 'library/queries/_fragments';

const UPDATE_COMMENT_MUTATION = gql`
  mutation UPDATE_COMMENT_MUTATION($where: CommentWhereUniqueInput!, $data: CommentUpdateInput!) {
    updateOneComment(where: $where, data: $data) {
      ...CommentFragment
    }
  }
  ${CommentFragment}
`;

export default UPDATE_COMMENT_MUTATION;
