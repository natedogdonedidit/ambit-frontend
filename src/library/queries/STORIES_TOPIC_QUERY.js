import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

export default STORIES_TOPIC_QUERY = gql`
  query STORIES_TOPIC_QUERY($topic: String!, $viewedStories: [String], $viewedStoryItems: [String]) {
    storiesTopic(topic: $topic, viewedStories: $viewedStories, viewedStoryItems: $viewedStoryItems) {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;
