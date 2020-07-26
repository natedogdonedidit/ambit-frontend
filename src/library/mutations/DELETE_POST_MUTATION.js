import { gql } from '@apollo/client';

const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($id: ID!, $ownerID: ID!) {
    deletePost(id: $id, ownerID: $ownerID) {
      id
    }
  }
`;

export default DELETE_POST_MUTATION;
