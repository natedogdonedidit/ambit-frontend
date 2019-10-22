import gql from 'graphql-tag';

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($owner: ID!, $id: ID!) {
    deleteComment(owner: $owner, id: $id) {
      id
    }
  }
`;

export default DELETE_COMMENT_MUTATION;
