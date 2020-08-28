import { gql } from '@apollo/client';

const DELETE_UPDATE_MUTATION = gql`
  mutation DELETE_UPDATE_MUTATION($where: UpdateWhereUniqueInput!) {
    deleteOneUpdate(where: $where) {
      id
    }
  }
`;

export default DELETE_UPDATE_MUTATION;
