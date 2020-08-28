import { gql } from '@apollo/client';

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($where: CommentWhereUniqueInput!) {
    deleteOneComment(where: $where) {
      id
    }
  }
`;

export default DELETE_COMMENT_MUTATION;
