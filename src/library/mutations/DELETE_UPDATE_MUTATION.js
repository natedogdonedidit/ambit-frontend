import gql from 'graphql-tag';

const DELETE_UPDATE_MUTATION = gql`
  mutation DELETE_UPDATE_MUTATION($owner: ID!, $id: ID!) {
    deleteUpdate(owner: $owner, id: $id) {
      id
    }
  }
`;

export default DELETE_UPDATE_MUTATION;
