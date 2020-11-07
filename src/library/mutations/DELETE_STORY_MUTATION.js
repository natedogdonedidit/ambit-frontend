import { gql } from '@apollo/client';

const DELETE_STORY_MUTATION = gql`
  mutation DELETE_STORY_MUTATION($where: StoryWhereUniqueInput!) {
    deleteOneStory(where: $where) {
      id
    }
  }
`;

export default DELETE_STORY_MUTATION;
