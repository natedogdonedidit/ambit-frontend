import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

const EDIT_GOALSTATUS_MUTATION = gql`
  mutation EDIT_GOALSTATUS_MUTATION($ownerID: ID!, $id: ID!, $goalStatus: String!) {
    editGoalStatus(ownerID: $ownerID, id: $id, goalStatus: $goalStatus) {
      ...BasicPost
    }
  }
  ${BasicPost}
`;

export default EDIT_GOALSTATUS_MUTATION;
