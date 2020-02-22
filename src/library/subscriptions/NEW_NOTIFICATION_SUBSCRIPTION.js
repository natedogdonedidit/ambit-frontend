import gql from 'graphql-tag';
import { NotificationFragment } from 'library/queries/_fragments';

const NEW_NOTIFICATION_SUBSCRIPTION = gql`
  subscription NEW_NOTIFICATION_SUBSCRIPTION($id: ID!) {
    newNotification(id: $id) {
      ...NotificationFragment
    }
  }
  ${NotificationFragment}
`;

export default NEW_NOTIFICATION_SUBSCRIPTION;
