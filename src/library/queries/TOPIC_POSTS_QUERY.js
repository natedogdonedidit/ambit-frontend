import gql from 'graphql-tag';
import { ListPosts } from 'library/queries/_fragments';

export default TOPIC_POSTS_QUERY = gql`
  query TOPIC_POSTS_QUERY($topic: String, $cursor: String) {
    postsTopic(topic: $topic, after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
