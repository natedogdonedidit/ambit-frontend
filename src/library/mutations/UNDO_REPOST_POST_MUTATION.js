import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

// alias of UPDATE_POST_MUTATION t.crud.updateOnePost on backend
const UNDO_REPOST_POST_MUTATION = gql`
  mutation UNDO_REPOST_POST_MUTATION($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    undoRePost(where: $where, data: $data) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default UNDO_REPOST_POST_MUTATION;
