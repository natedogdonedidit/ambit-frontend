import gql from 'graphql-tag';
import { BasicPost } from 'library/queries/_fragments';

const SEARCH_POSTS_QUERY = gql`
  query SEARCH_POSTS_QUERY($text: String, $goal: String, $topicID: String, $lat: Float, $lon: Float, $cursor: String) {
    postsSearch(text: $text, goal: $goal, topicID: $topicID, lat: $lat, lon: $lon, after: $cursor) {
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
