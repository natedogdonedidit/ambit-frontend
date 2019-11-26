import gql from 'graphql-tag';

// NON-DEPENDENT FRAGMENTS
export const MinimalUser = gql`
  fragment MinimalUser on User {
    id
    name
    profilePic
    headline
    location
    intro {
      id
      title
      items {
        id
        type
        url
        link
        text
        duration
      }
    }
  }
`;

export const LoggedInUser = gql`
  fragment LoggedInUser on User {
    id
    createdAt
    name
    firstName
    lastName
    headline
    email
    profilePic
    location
    locationLat
    locationLon
    intro {
      id
      title
      items {
        id
        type
        url
        link
        text
        duration
      }
    }
  }
`;

export const FullSkills = gql`
  fragment FullSkills on Skill {
    id
    skill
    isExpert
  }
`;

export const FullExperience = gql`
  fragment FullExperience on Experience {
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
`;

export const FullEducation = gql`
  fragment FullEducation on Education {
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
`;

// UPDATE FRAGMENTS
export const UpdateFragment = gql`
  fragment UpdateFragment on Update {
    id
    createdAt
    content
    image
    likesCount
    likedByMe
    commentsCount
    sharesCount
    parentPost {
      id
    }
  }
`;

// POSTS FRAGMENTS
export const ListPosts = gql`
  fragment ListPosts on Post {
    id
    createdAt
    lastUpdated
    owner {
      ...MinimalUser
    }
    isGoal
    goal
    field
    location
    content
    tags
    images
    video
    pitch
    isPrivate
    likesCount
    likedByMe
    commentsCount
    sharesCount
    updates {
      ...UpdateFragment
    }
  }
  ${MinimalUser}
  ${UpdateFragment}
`;

export const CommentFragment = gql`
  fragment CommentFragment on Comment {
    id
    createdAt
    owner {
      ...MinimalUser
    }
    parentPost {
      id
    }
    parentComment {
      id
    }
    parentUpdate {
      id
    }
    content
    image
    likesCount
    likedByMe
    commentsCount
    comments {
      id
      createdAt
      owner {
        ...MinimalUser
      }
      parentPost {
        id
      }
      parentComment {
        id
      }
      parentUpdate {
        id
      }
      content
      image
      likesCount
      likedByMe
      commentsCount
      comments {
        id
      }
    }
  }
  ${MinimalUser}
`;

export const DetailPost = gql`
  fragment DetailPost on Post {
    ...ListPosts
    comments {
      ...CommentFragment
    }
    updates {
      comments {
        ...CommentFragment
      }
    }
  }
  ${ListPosts}
  ${MinimalUser}
  ${CommentFragment}
`;

// export const DetailUpdate = gql`
//   fragment DetailUpdate on Post {
//     id
//     createdAt
//     parentPost {
//       ...ListPosts
//     }
//     content
//     image
//     likesCount
//     likedByMe
//     commentsCount
//     sharesCount
//     comments {
//       id
//       createdAt
//       owner {
//         ...MinimalUser
//       }
//       content
//       image
//       likesCount
//       likedByMe
//       commentsCount
//       comments {
//         id
//         createdAt
//         owner {
//           ...MinimalUser
//         }
//         content
//         image
//         likesCount
//         likedByMe
//       }
//     }
//   }
//   ${ListPosts}
//   ${MinimalUser}
// `;

export const DetailedUser = gql`
  fragment DetailedUser on User {
    ...LoggedInUser
    bannerPic
    industry
    website
    bio
    about
    isMentor
    isFreelancer
    isAgency
    isInvestor
    mentorFields
    freelanceFields
    investorFields
    agencyFields
    skills {
      ...FullSkills
    }
    experience {
      ...FullExperience
    }
    education {
      ...FullEducation
    }
  }
  ${LoggedInUser}
  ${FullSkills}
  ${FullExperience}
  ${FullEducation}
`;
