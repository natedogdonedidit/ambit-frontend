import { gql } from '@apollo/client';
import { AllTopicsFragment } from 'library/queries/_fragments';

export default CURRENT_USER_TOPICS = gql`
  query CURRENT_USER_TOPICS {
    userLoggedIn {
      ...AllTopicsFragment
    }
  }
  ${AllTopicsFragment}
`;
