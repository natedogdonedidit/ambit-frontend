import { gql } from '@apollo/client';

const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($where: PostWhereUniqueInput!) {
    deleteOnePost(where: $where) {
      id
    }
  }
`;

export default DELETE_POST_MUTATION;
