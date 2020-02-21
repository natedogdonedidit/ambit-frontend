import gql from 'graphql-tag';

// NON-DEPENDENT FRAGMENTS
export const MinimalUser = gql`
  fragment MinimalUser on User {
    id
    name
    profilePic
    headline
    location
    locationID
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

export const MessageFragment = gql`
  fragment MessageFragment on Message {
    id
    createdAt
    from {
      id
      firstName
      lastName
      name
      profilePic
    }
    content
  }
`;

export const BasicChat = gql`
  fragment BasicChat on Chat {
    id
    updatedAt
    users {
      ...MinimalUser
    }
    latestMessage {
      createdAt
      content
    }
  }
  ${MinimalUser}
`;

export const LoggedInUser = gql`
  fragment LoggedInUser on User {
    ...MinimalUser
    createdAt
    firstName
    lastName
    bio
    email
    topicsFocus {
      topicID
      name
    }
    topicsInterest {
      topicID
      name
    }
    topicsFreelance {
      topicID
      name
    }
    topicsInvest {
      topicID
      name
    }
    topicsMentor {
      topicID
      name
    }
    chats {
      ...BasicChat
    }
  }
  ${MinimalUser}
  ${BasicChat}
`;

export const DetailedChat = gql`
  fragment DetailedChat on Chat {
    id
    updatedAt
    users {
      ...LoggedInUser
    }
    messages {
      ...MessageFragment
    }
  }
  ${LoggedInUser}
  ${MessageFragment}
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
    locationID
    locationLat
    locationLon
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
    locationID
    locationLat
    locationLon
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
export const BasicPost = gql`
  fragment BasicPost on Post {
    id
    createdAt
    lastUpdated
    owner {
      ...MinimalUser
    }
    isGoal
    goal
    subField {
      id
      name
      topicID
    }
    topics {
      id
      name
      topicID
      parentTopic {
        topicID
      }
    }
    location
    locationID
    locationLat
    locationLon
    content
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
    ...BasicPost
    comments {
      ...CommentFragment
    }
    updates {
      comments {
        ...CommentFragment
      }
    }
  }
  ${BasicPost}
  ${CommentFragment}
`;

export const DetailedUser = gql`
  fragment DetailedUser on User {
    ...LoggedInUser
    bannerPic
    website
    bio
    about
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
