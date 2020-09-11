import { gql } from '@apollo/client';
import { NotificationFragment } from 'library/queries/_fragments';

export default NOTIFICATIONS_QUERY = gql`
  query NOTIFICATIONS_QUERY(
    $after: NotificationWhereUniqueInput
    $first: Int
    $where: NotificationWhereInput
    $orderBy: [NotificationOrderByInput!]
  ) {
    notifications(after: $after, first: $first, where: $where, orderBy: $orderBy)
      @connection(key: "notificationss", filter: ["where"]) {
      ...NotificationFragment
    }
  }
  ${NotificationFragment}
`;
