import gql from 'graphql-tag';
import { MinimalUser } from 'library/queries/_fragments';

const CONNECTIONS_QUERY_FORYOU = gql`
  query CONNECTIONS_QUERY_FORYOU {
    usersForYou {
      user {
        ...MinimalUser
      }
      reason {
        text
        icon
      }
    }
  }
  ${MinimalUser}
`;

const mapTabToQuery = tab => {
  switch (tab) {
    case 'For you':
      return CONNECTIONS_QUERY_FORYOU;
    default:
      return CONNECTIONS_QUERY_FORYOU;
  }
};

export default mapTabToQuery;
