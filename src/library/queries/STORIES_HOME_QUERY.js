import gql from 'graphql-tag';
import { StoryFragment } from 'library/queries/_fragments';

export default STORIES_HOME_QUERY = gql`
  query STORIES_HOME_QUERY {
    storiesHome {
      ...StoryFragment
    }
  }
  ${StoryFragment}
`;
