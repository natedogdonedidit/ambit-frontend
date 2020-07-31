import { gql } from '@apollo/client';

export default CURRENT_USER_FOLLOWING = gql`
  query CURRENT_USER_FOLLOWING {
    iFollow
  }
`;
