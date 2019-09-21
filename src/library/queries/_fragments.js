import gql from 'graphql-tag';

// NON-DEPENDENT FRAGMENTS
export const MinimalUser = gql`
  fragment MinimalUser on User {
    id
    name
    profilePic
    location
    intro
  }
`;

export const LoggedInUser = gql`
  fragment LoggedInUser on User {
    id
    createdAt
    name
    firstName
    lastName
    email
    profilePic
    location
    locationLat
    locationLon
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
      id
      createdAt
      content
      image
      likesCount
      likedByMe
      commentsCount
      sharesCount
    }
  }
  ${MinimalUser}
`;

export const AllComments = gql`
  fragment AllComments on Post {
    id
    createdAt
    owner {
      ...MinimalUser
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
      content
      image
      likesCount
      likedByMe
    }
  }
  ${MinimalUser}
`;

export const DetailPost = gql`
  fragment DetailPost on Post {
    ...ListPosts
    comments {
      id
      createdAt
      owner {
        ...MinimalUser
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
        content
        image
        likesCount
        likedByMe
      }
    }
  }
  ${ListPosts}
  ${MinimalUser}
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
    jobTitle
    profession
    industry
    website
    bio
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
