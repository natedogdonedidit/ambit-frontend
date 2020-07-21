import gql from 'graphql-tag';
import { UpdateFragment } from 'library/queries/_fragments';

const LIKE_UPDATE_MUTATION = gql`
  mutation LIKE_UPDATE_MUTATION($updateId: ID!) {
    likeUpdate(updateId: $updateId) {
      ...UpdateFragment
    }
  }
  ${UpdateFragment}
`;

export default LIKE_UPDATE_MUTATION;
