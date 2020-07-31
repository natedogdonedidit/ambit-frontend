import { gql } from '@apollo/client';
// import { AllTopicsFragment } from 'library/queries/_fragments';

const EDIT_TOPICS_FOCUS_MUTATION = gql`
  mutation EDIT_TOPICS_FOCUS_MUTATION($topics: [TopicWhereUniqueInput]!) {
    editTopicsFocus(topics: $topics) {
      topicsFocus {
        id
        topicID
        name
      }
    }
  }
`;

export default EDIT_TOPICS_FOCUS_MUTATION;
