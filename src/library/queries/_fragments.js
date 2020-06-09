import gql from 'graphql-tag';

// NON-DEPENDENT FRAGMENTS
export const StoryFragment = gql`
  fragment StoryFragment on Story {
    id
    title
    owner {
      id
      name
      headline
      location
      profilePic
    }
    type
    preview
    showcase
    save
    topics {
      name
      topicID
    }
    items {
      id
      createdAt
      owner {
        id
        name
        firstName
        headline
        location
        profilePic
      }
      stories {
        id
        type
        title
        save
        topics {
          name
          topicID
        }
      }
      type
      url
      preview
      link
      text
      duration
    }
  }
`;

export const MinimalUser = gql`
  fragment MinimalUser on User {
    id
    name
    profilePic
    bannerPic
    headline
    bio
    website
    connectionsCount
    followingCount
    followersCount
    location
    locationID
    locationLat
    locationLon
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
    intro {
      ...StoryFragment
    }
    myStory {
      ...StoryFragment
    }
  }
  ${StoryFragment}
`;

export const GroupFragment = gql`
  fragment GroupFragment on Group {
    id
    updatedAt
    users {
      ...MinimalUser
    }
    latestMessage {
      id
      createdAt
      content
      hidden {
        id
      }
    }
    hidden {
      id
    }
  }
  ${MinimalUser}
`;

export const MessageFragment = gql`
  fragment MessageFragment on Message {
    id
    createdAt
    to {
      ...GroupFragment
    }
    from {
      id
      firstName
      lastName
      name
      profilePic
    }
    content
    hidden {
      id
    }
  }
  ${GroupFragment}
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
      owner {
        id
      }
    }
  }
`;

// POSTS FRAGMENTS
export const MinimalPost = gql`
  fragment MinimalPost on Post {
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
    content
    images
    video
    pitch
  }
  ${MinimalUser}
`;

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
    ...MinimalUser
    createdAt
    firstName
    lastName
    email
    about
    connections {
      ...MinimalUser
    }
    following {
      ...MinimalUser
    }
    followers {
      ...MinimalUser
    }
    skills {
      ...FullSkills
    }
    experience {
      ...FullExperience
    }
    education {
      ...FullEducation
    }
    stories {
      ...StoryFragment
    }
  }
  ${MinimalUser}
  ${FullSkills}
  ${FullExperience}
  ${FullEducation}
  ${StoryFragment}
`;

export const LoggedInUser = gql`
  fragment LoggedInUser on User {
    ...DetailedUser
    groups {
      ...GroupFragment
    }
    unReadMessages {
      ...MessageFragment
    }
    unReadMessagesCount
  }
  ${DetailedUser}
  ${GroupFragment}
  ${MessageFragment}
`;

export const NotificationFragment = gql`
  fragment NotificationFragment on Notification {
    id
    createdAt
    target {
      ...MinimalUser
    }
    style
    user {
      ...MinimalUser
    }
    users {
      ...MinimalUser
    }
    post {
      ...MinimalPost
    }
    update {
      ...UpdateFragment
    }
    comment {
      ...CommentFragment
    }
    seen
  }
  ${MinimalUser}
  ${MinimalPost}
  ${UpdateFragment}
  ${CommentFragment}
`;
