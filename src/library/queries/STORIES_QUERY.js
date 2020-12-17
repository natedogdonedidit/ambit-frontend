import { gql } from '@apollo/client';
import { StoryFragment } from 'library/queries/_fragments';

export default STORIES_QUERY = gql`
  query STORIES_QUERY(
    $where: StoryWhereInput!
    $orderBy: [StoryOrderByInput!]
    $first: Int
    $last: Int
    $after: StoryWhereUniqueInput
  ) {
    stories(where: $where, orderBy: $orderBy, first: $first, last: $last, after: $after) {
      ...StoryFragment
    }
  }
  ${StoryFragment}
`;
