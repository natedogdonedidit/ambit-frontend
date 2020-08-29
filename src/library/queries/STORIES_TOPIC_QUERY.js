import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

export default STORIES_TOPIC_QUERY = gql`
  query STORIES_TOPIC_QUERY(
    $where: StoryWhereInput!
    $orderBy: [StoryOrderByInput!]
    $after: StoryWhereUniqueInput
    $first: Int
  ) {
    stories(where: $where, orderBy: $orderBy, after: $after, first: $first) @connection(key: "storiesTopic", filter: ["where"]) {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;
