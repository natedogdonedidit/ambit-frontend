import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

const UPDATE_INTRO_MUTATION = gql`
  mutation UPDATE_INTRO_MUTATION(
    $id: ID!
    $updateItems: [StoryItemUpdateWithWhereUniqueWithoutStoriesInput]
    $createItems: [StoryItemCreateWithoutStoriesInput]
    $deleteItems: [StoryItemWhereUniqueInput]
  ) {
    updateIntro(id: $id, updateItems: $updateItems, createItems: $createItems, deleteItems: $deleteItems) {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;

export default UPDATE_INTRO_MUTATION;
