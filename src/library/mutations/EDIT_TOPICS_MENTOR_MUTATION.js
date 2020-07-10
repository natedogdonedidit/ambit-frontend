import gql from 'graphql-tag';
import { AllTopicsFragment } from 'library/queries/_fragments';

const EDIT_TOPICS_MENTOR_MUTATION = gql`
  mutation EDIT_TOPICS_MENTOR_MUTATION($topics: [TopicWhereUniqueInput]!) {
    editTopicsMentor(topics: $topics) {
      ...AllTopicsFragment
    }
  }
  ${AllTopicsFragment}
`;

export default EDIT_TOPICS_MENTOR_MUTATION;
