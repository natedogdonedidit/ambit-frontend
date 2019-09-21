import gql from 'graphql-tag';
import { ListPosts } from 'library/queries/_fragments';

export default LOCAL_POSTS_QUERY = gql`
  query LOCAL_POSTS_QUERY($lat: Float, $lon: Float, $radius: Int) {
    postsLocal(lat: $lat, lon: $lon, radius: $radius) {
      ...ListPosts
    }
  }
  ${ListPosts}
`;
