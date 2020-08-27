import { gql } from '@apollo/client';
import { DetailPost } from 'library/queries/_fragments';

export default POST_COMMENTS_QUERY = gql`
  query POST_COMMENTS_QUERY($where: PostWhereUniqueInput!) {
    post(where: $where) {
      ...DetailPost
    }
  }
  ${DetailPost}
`;
