import gql from 'graphql-tag';
import { AllTopicsFragment } from 'library/queries/_fragments';

export default CURRENT_USER_TOPICS = gql`
  query CURRENT_USER_TOPICS {
    myTopics {
      ...AllTopicsFragment
    }
  }
  ${AllTopicsFragment}
`;
