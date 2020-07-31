import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

export default STORIES_HOME_QUERY = gql`
  query STORIES_HOME_QUERY {
    storiesHome {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;
