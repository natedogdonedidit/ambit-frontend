import gql from 'graphql-tag';

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($owner: ID!, $post: PostCreateInput!) {
    createPost(owner: $owner, post: $post) {
      id
      createdAt
      owner {
        id
      }
      isGoal
      goal
      location
      locationLon
      locationLat
      content
      tags
      images
      video
      pitch
      isPrivate
      lastUpdated
      likes {
        id
      }
      comments {
        id
      }
    }
  }
`;

export default CREATE_POST_MUTATION;
