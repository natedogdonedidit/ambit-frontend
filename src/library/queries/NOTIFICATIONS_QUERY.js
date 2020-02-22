import gql from 'graphql-tag';
import { NotificationFragment } from 'library/queries/_fragments';

export default NOTIFICATIONS_QUERY = gql`
  query NOTIFICATIONS_QUERY {
    myNotifications {
      ...NotificationFragment
    }
  }
  ${NotificationFragment}
`;
