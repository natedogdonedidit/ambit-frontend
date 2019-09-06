import gql from 'graphql-tag';

export default LOCAL_POSTS_QUERY = gql`
  query LOCAL_POSTS_QUERY($lat: Float, $lon: Float, $radius: Int) {
    postsLocal(lat: $lat, lon: $lon, radius: $radius) {
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
