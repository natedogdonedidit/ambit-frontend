import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    updateOnePost(where: $where, data: $data) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default UPDATE_POST_MUTATION;
