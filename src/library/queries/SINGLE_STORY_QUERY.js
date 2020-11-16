import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

export default SINGLE_STORY_QUERY = gql`
  query SINGLE_STORY_QUERY($where: StoryWhereUniqueInput!) {
    story(where: $where) {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;
