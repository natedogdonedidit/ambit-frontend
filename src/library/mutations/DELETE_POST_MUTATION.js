import gql from 'graphql-tag';

const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($owner: ID!, $id: ID!) {
    deletePost(owner: $owner, id: $id) {
      id
    }
  }
`;

export default DELETE_POST_MUTATION;
