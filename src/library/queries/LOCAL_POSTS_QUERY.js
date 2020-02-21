import gql from 'graphql-tag';
import { BasicPost } from 'library/queries/_fragments';

export default LOCAL_POSTS_QUERY = gql`
  query LOCAL_POSTS_QUERY($lat: Float, $lon: Float, $radius: Int, $cursor: String) {
    postsLocal(lat: $lat, lon: $lon, radius: $radius, after: $cursor) {
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
