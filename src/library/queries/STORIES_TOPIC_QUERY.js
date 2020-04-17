import gql from 'graphql-tag';
import { StoryFragment } from 'library/queries/_fragments';

export default STORIES_TOPIC_QUERY = gql`
  query STORIES_TOPIC_QUERY($topicID: String!) {
    storiesTopic(topicID: $topicID) {
      ...StoryFragment
    }
  }
  ${StoryFragment}
`;
