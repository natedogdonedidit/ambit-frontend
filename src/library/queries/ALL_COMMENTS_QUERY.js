import { gql } from '@apollo/client';
import { AllComments } from 'library/queries/_fragments';

export default ALL_COMMENTS_QUERY = gql`
  query ALL_COMMENTS_QUERY($postId: ID!, $isUpdate: Boolean) {
    allComments(id: $id, isUpdate: $isUpdate) {
      ...AllComments
    }
  }
  ${AllComments}
`;
