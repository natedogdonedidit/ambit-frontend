import gql from 'graphql-tag';
import { AllTopicsFragment } from 'library/queries/_fragments';

const EDIT_TOPICS_INTEREST_MUTATION = gql`
  mutation EDIT_TOPICS_INTEREST_MUTATION($topics: [TopicWhereUniqueInput]!) {
    editTopicsInterest(topics: $topics) {
      ...AllTopicsFragment
    }
  }
  ${AllTopicsFragment}
`;

export default EDIT_TOPICS_INTEREST_MUTATION;
