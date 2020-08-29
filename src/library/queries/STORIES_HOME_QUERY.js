import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

export default STORIES_HOME_QUERY = gql`
  query STORIES_HOME_QUERY {
    storiesHome {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;

// export default STORIES_HOME_QUERY = gql`
//   query STORIES_HOME_QUERY($where: StoryWhereInput!, $orderBy: [StoryOrderByInput!], $after: StoryWhereUniqueInput, $first: Int) {
//     stories(where: $where, orderBy: $orderBy, after: $after, first: $first) {
//       ...StoryWithOwner
//     }
//   }
//   ${StoryWithOwner}
// `;
