import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

export default STORIES_FORYOU_QUERY = gql`
  query STORIES_FORYOU_QUERY($feed: String!, $viewedStories: [String], $viewedStoryItems: [String]) {
    storiesForYou(feed: $feed, viewedStories: $viewedStories, viewedStoryItems: $viewedStoryItems) {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;

// export default STORIES_FORYOU_QUERY = gql`
//   query STORIES_FORYOU_QUERY($where: StoryWhereInput!, $orderBy: [StoryOrderByInput!], $after: StoryWhereUniqueInput, $first: Int) {
//     stories(where: $where, orderBy: $orderBy, after: $after, first: $first) {
//       ...StoryWithOwner
//     }
//   }
//   ${StoryWithOwner}
// `;
