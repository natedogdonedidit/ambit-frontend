import gql from 'graphql-tag';
import { UpdateFragment } from 'library/queries/_fragments';

const LIKE_UPDATE = gql`
  mutation LIKE_UPDATE($updateId: ID!) {
    likeUpdate(updateId: $updateId) {
      ...UpdateFragment
    }
  }
  ${UpdateFragment}
`;

export default LIKE_UPDATE;
