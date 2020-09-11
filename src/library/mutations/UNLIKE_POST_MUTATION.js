import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

// alias of UPDATE_POST_MUTATION t.crud.updateOnePost on backend
const UNLIKE_POST_MUTATION = gql`
  mutation UNLIKE_POST_MUTATION($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    unlikePost(where: $where, data: $data) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default UNLIKE_POST_MUTATION;
