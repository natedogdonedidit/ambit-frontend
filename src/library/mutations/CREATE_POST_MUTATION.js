import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($data: PostCreateInput!) {
    createOnePost(data: $data) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default CREATE_POST_MUTATION;
