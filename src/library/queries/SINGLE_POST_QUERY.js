import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

export default SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($where: PostWhereUniqueInput!) {
    post(where: $where) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;
