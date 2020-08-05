import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

const SEARCH_POSTS_QUERY = gql`
  query SEARCH_POSTS_QUERY($text: String, $goal: String, $topicIDs: [String], $lat: Float, $lon: Float, $cursor: String) {
    postsSearch(text: $text, goal: $goal, topicIDs: $topicIDs, lat: $lat, lon: $lon, after: $cursor) {
      edges {
        node {
          ...BasicPost
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${BasicPost}
`;

export default SEARCH_POSTS_QUERY;
