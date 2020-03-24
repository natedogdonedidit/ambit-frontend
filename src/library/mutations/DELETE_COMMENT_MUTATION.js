import gql from 'graphql-tag';

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: ID!, $ownerID: ID!) {
    deleteComment(id: $id, ownerID: $ownerID) {
      id
    }
  }
`;

export default DELETE_COMMENT_MUTATION;
