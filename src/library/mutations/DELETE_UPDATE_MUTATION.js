import { gql } from '@apollo/client';

const DELETE_UPDATE_MUTATION = gql`
  mutation DELETE_UPDATE_MUTATION($id: ID!, $ownerID: ID!) {
    deleteUpdate(id: $id, ownerID: $ownerID) {
      id
    }
  }
`;

export default DELETE_UPDATE_MUTATION;
