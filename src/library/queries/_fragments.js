import { gql } from '@apollo/client';

// NON-DEPENDENT FRAGMENTS
export const AllTopicsFragment = gql`
  fragment AllTopicsFragment on User {
    topicsFocus {
      id
      topicID
      name
    }
    topicsInterest {
      id
      topicID
      name
    }
    topicsFreelance {
      id
      topicID
      name
    }
    topicsInvest {
      id
      topicID
      name
    }
    topicsMentor {
      id
      topicID
      name
    }
  }
`;

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
    _deleted
  }
`;

export const StoryItemFragment = gql`
  fragment StoryItemFragment on StoryItem {
    id
    createdAt
    type
    url
    preview
    link
    text
    duration
    likedByMe
    likesCount
    viewedByMe
    plays
  }
`;

// this is for places where the owner is already there...aka MinimalUser fragment
export const StoryNoOwner = gql`
  fragment StoryNoOwner on Story {
    id
    title
    type
    showcase
    topics {
      id
      topicID
    }
    items {
      ...StoryItemFragment
    }
  }
  ${StoryItemFragment}
`;

// used for queries that only grab stories...StoriesHome / StoriesTopic
export const StoryWithOwner = gql`
  fragment StoryWithOwner on Story {
    id
    title
    owner {
      id
      name
      username
      headline
      location
      profilePic
      intro {
        id
        title
        type
        items {
          ...StoryItemFragment
        }
      }
    }
    type
    showcase
    topics {
      id
      topicID
    }
    items {
      ...StoryItemFragment
    }
  }
  ${StoryItemFragment}
`;

export const MinimalUser = gql`
  fragment MinimalUser on User {
    id
    username
    name
    profilePic
    bannerPic
    headline
    bio
    website
    location
    locationID
    locationLat
    locationLon
    intro {
      ...StoryNoOwner
    }
    myStory {
      ...StoryNoOwner
    }
    latestProject {
      ...StoryNoOwner
    }
    followingCount
    followersCount
  }
  ${StoryNoOwner}
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
    goalStatus
    subField {
      id
      topicID
    }
    topics {
      id
      topicID
      parentTopic {
        id
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
    likesCount
    likedByMe
    commentsCount
    sharesCount
    updates {
      ...UpdateFragment
    }
    _deleted
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
      parentPost {
        id
      }
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
      _deleted
    }
    _deleted
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

export const UserProfileFragment = gql`
  fragment UserProfileFragment on User {
    ...MinimalUser
    username
    about
    followingCount
    followersCount
    ...AllTopicsFragment
    stories {
      ...StoryWithOwner
    }
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
      locationID
      locationLat
      locationLon
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
      locationID
      locationLat
      locationLon
      currentRole
    }
  }
  ${MinimalUser}
  ${AllTopicsFragment}
  ${StoryWithOwner}
`;

export const UserWithMessages = gql`
  fragment UserWithMessages on User {
    ...MinimalUser
    groups {
      ...GroupFragment
    }
    unReadMessages {
      ...MessageFragment
    }
    unReadMessagesCount
  }
  ${MinimalUser}
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
      ...BasicPost
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
  ${BasicPost}
  ${UpdateFragment}
  ${CommentFragment}
`;
