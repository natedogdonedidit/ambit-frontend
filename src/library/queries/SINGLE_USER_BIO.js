import gql from 'graphql-tag';

const SINGLE_USER_BIO = gql`
  query SINGLE_USER_BIO($id: ID!) {
    user(id: $id) {
      id
      createdAt
      name
      email
      profilePic
      bannerPic
      location
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
      # posts {
      #   id
      #   createdAt
      #   owner
      #   isGoal
      #   goal
      #   location
      #   content
      #   tags
      #   images
      #   video
      #   pitch
      #   likes
      #   comments
      # }
    }
  }
`;

export default SINGLE_USER_BIO;
