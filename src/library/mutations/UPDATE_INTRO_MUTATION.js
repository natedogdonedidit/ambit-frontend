import gql from 'graphql-tag';
import { StoryFragment } from 'library/queries/_fragments';

const UPDATE_INTRO_MUTATION = gql`
  mutation UPDATE_INTRO_MUTATION(
    $id: ID!
    $updateItems: [StoryItemUpdateWithWhereUniqueWithoutStoriesInput]
    $createItems: [StoryItemCreateWithoutStoriesInput]
    $deleteItems: [StoryItemWhereUniqueInput]
  ) {
    updateIntro(id: $id, updateItems: $updateItems, createItems: $createItems, deleteItems: $deleteItems) {
      ...StoryFragment
    }
  }
  ${StoryFragment}
`;

export default UPDATE_INTRO_MUTATION;
