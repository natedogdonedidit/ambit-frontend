import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

export default STORIES_TOPIC_QUERY = gql`
  query STORIES_TOPIC_QUERY($topicID: String!) {
    storiesTopic(topicID: $topicID) {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;
