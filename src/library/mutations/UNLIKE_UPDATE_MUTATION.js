import gql from 'graphql-tag';
import { UpdateFragment } from 'library/queries/_fragments';

const UNLIKE_UPDATE_MUTATION = gql`
  mutation UNLIKE_UPDATE_MUTATION($updateId: ID!) {
    unlikeUpdate(updateId: $updateId) {
      ...UpdateFragment
    }
  }
  ${UpdateFragment}
`;

export default UNLIKE_UPDATE_MUTATION;
