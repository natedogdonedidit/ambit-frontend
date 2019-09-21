import gql from 'graphql-tag';
import { DetailPost } from 'library/queries/_fragments';

export default SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    singlePost(id: $id) {
      ...DetailPost
    }
  }
  ${DetailPost}
`;
