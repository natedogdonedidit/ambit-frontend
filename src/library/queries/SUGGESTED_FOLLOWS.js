import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

const SUGGESTED_FOLLOWS = gql`
  query SUGGESTED_FOLLOWS {
    suggestedFollows {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;

export default SUGGESTED_FOLLOWS;
