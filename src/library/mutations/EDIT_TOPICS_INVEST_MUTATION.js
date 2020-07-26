import { gql } from '@apollo/client';
import { AllTopicsFragment } from 'library/queries/_fragments';

const EDIT_TOPICS_INVEST_MUTATION = gql`
  mutation EDIT_TOPICS_INVEST_MUTATION($topics: [TopicWhereUniqueInput]!) {
    editTopicsInvest(topics: $topics) {
      ...AllTopicsFragment
    }
  }
  ${AllTopicsFragment}
`;

export default EDIT_TOPICS_INVEST_MUTATION;
