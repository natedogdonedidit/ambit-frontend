import gql from 'graphql-tag';

export default GLOBAL_POSTS_QUERY = gql`
  query GLOBAL_POSTS_QUERY {
    postsGlobal {
      id
      createdAt
      lastUpdated
      owner {
        id
        name
        profilePic
        location
        jobTitle
        profession
        industry
        intro
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
