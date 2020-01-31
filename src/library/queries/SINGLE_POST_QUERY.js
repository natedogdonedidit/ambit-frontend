import gql from 'graphql-tag';
import { DetailPost, MinimalUser } from 'library/queries/_fragments';

export default SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    singlePost(id: $id) {
      post {
        ...DetailPost
      }
      matches {
        ...MinimalUser
      }
    }
  }
  ${DetailPost}
  ${MinimalUser}
`;
