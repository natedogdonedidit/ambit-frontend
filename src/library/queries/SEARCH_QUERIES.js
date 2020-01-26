import gql from 'graphql-tag';
import { ListPosts } from 'library/queries/_fragments';

// QUERY NAME MUST MATCH TOPICID!!!!!

// TECHNOLOGY
const SEARCH_POSTS_QUERY = gql`
  query SEARCH_POSTS_QUERY($text: String, $topicID: String, $lat: Float, $lon: Float, $cursor: String) {
    postsSearch(text: $text, topicID: $topicID, lat: $lat, lon: $lon, after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const selectSearchQuery = activeTab => {
  if (activeTab === 'Top') return SEARCH_POSTS_QUERY;

  return SEARCH_POSTS_QUERY;
};

export default selectSearchQuery;
