import gql from 'graphql-tag';

export default MY_POSTS_QUERY = gql`
  query MY_POSTS_QUERY {
    postsMy {
      id
      createdAt
      lastUpdated
      owner {
        id
        name
        profilePic
        location
      }
      isGoal
      goal
      location
      content
      tags
      images
      video
      pitch
      isPrivate
      likes {
        id
      }
      comments {
        id
      }
    }
  }
`;
