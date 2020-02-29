import gql from 'graphql-tag';
import { MessageFragment } from 'library/queries/_fragments';

const MESSAGE_SUBSCRIPTION = gql`
  subscription MESSAGE_SUBSCRIPTION($id: ID!) {
    newMessageToMe(id: $id) {
      ...MessageFragment
    }
  }
  ${MessageFragment}
`;

export default MESSAGE_SUBSCRIPTION;
