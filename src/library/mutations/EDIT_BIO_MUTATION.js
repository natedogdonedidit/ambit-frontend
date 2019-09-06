import gql from 'graphql-tag';

const EDIT_BIO_MUTATION = gql`
  mutation EDIT_BIO_MUTATION($id: ID!, $data: UserUpdateInput!) {
    editBio(id: $id, data: $data) {
      id
      createdAt
      name
      email
      profilePic
      bannerPic
      location
      locationLat
      locationLon
      jobTitle
      profession
      industry
      website
      bio
      skills {
        id
        skill
        isExpert
      }
      experience {
        id
        name
        subText
        startDateMonth
        startDateYear
        endDateMonth
        endDateYear
        location
        currentRole
      }
      education {
        id
        name
        subText
        startDateMonth
        startDateYear
        endDateMonth
        endDateYear
        location
        currentRole
      }
      # interests
      posts {
        id
        createdAt
        owner {
          id
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
  }
`;

export default EDIT_BIO_MUTATION;
