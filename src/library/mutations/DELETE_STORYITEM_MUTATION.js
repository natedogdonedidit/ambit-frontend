import { gql } from '@apollo/client';

const DELETE_STORYITEM_MUTATION = gql`
  mutation DELETE_STORYITEM_MUTATION($where: StoryItemWhereUniqueInput!) {
    deleteOneStoryItem(where: $where) {
      id
    }
  }
`;

export default DELETE_STORYITEM_MUTATION;
