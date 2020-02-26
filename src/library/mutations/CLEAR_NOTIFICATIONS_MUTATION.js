import gql from 'graphql-tag';
import { NotificationFragment } from 'library/queries/_fragments';

const CLEAR_NOTIFICATIONS_MUTATION = gql`
  mutation CLEAR_NOTIFICATIONS_MUTATION {
    clearMyNotifications {
      ...NotificationFragment
    }
  }
  ${NotificationFragment}
`;

export default CLEAR_NOTIFICATIONS_MUTATION;
