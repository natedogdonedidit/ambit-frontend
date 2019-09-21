import gql from 'graphql-tag';
import { ListPosts } from 'library/queries/_fragments';

export default GLOBAL_POSTS_QUERY = gql`
  query GLOBAL_POSTS_QUERY {
    postsGlobal {
      ...ListPosts
    }
  }
  ${ListPosts}
`;
