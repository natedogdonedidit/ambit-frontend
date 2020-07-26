import { gql } from '@apollo/client';
import { NotificationFragment } from 'library/queries/_fragments';

export default NOTIFICATIONS_QUERY = gql`
  query NOTIFICATIONS_QUERY {
    myNotifications {
      ...NotificationFragment
    }
  }
  ${NotificationFragment}
`;
