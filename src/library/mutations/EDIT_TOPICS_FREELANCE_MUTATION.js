import { gql } from '@apollo/client';
import { AllTopicsFragment } from 'library/queries/_fragments';

const EDIT_TOPICS_FREELANCE_MUTATION = gql`
  mutation EDIT_TOPICS_FREELANCE_MUTATION($topics: [TopicWhereUniqueInput]!) {
    editTopicsFreelance(topics: $topics) {
      ...AllTopicsFragment
    }
  }
  ${AllTopicsFragment}
`;

export default EDIT_TOPICS_FREELANCE_MUTATION;
