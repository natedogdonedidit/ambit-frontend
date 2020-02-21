import gql from 'graphql-tag';
import { DetailPost } from 'library/queries/_fragments';

export default POST_COMMENTS_QUERY = gql`
  query POST_COMMENTS_QUERY($id: ID!) {
    singlePost(id: $id) {
      ...DetailPost
    }
  }
  ${DetailPost}
`;
