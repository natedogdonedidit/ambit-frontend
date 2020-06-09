import gql from 'graphql-tag';

const DELETE_STORY_MUTATION = gql`
  mutation DELETE_STORY_MUTATION($id: ID!) {
    deleteStory(id: $id) {
      id
    }
  }
`;

export default DELETE_STORY_MUTATION;