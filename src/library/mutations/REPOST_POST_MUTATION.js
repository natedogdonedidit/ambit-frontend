import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

// alias of UPDATE_POST_MUTATION t.crud.updateOnePost on backend
const REPOST_POST_MUTATION = gql`
  mutation REPOST_POST_MUTATION($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    rePost(where: $where, data: $data) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default REPOST_POST_MUTATION;
