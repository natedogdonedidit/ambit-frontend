import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

// alias of UPDATE_POST_MUTATION t.crud.updateOnePost on backend
const LIKE_POST_MUTATION = gql`
  mutation LIKE_POST_MUTATION($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    likePost(where: $where, data: $data) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default LIKE_POST_MUTATION;
