import { gql } from '@apollo/client';

// NON-DEPENDENT FRAGMENTS
export const AllTopicsFragment = gql`
  fragment AllTopicsFragment on User {
    id
    username
    topicsFocus {
      id
    }
    topicsInterest {
      id
    }
    topicsFreelance {
      id
    }
    topicsInvest {
      id
    }
    topicsMentor {
      id
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
        username
      }
    }
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
    topic
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
      username
      name
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
    topic
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
    bio
    website
    location
    locationID
    locationLat
    locationLon
    intro {
      ...StoryWithOwner
      # ...StoryNoOwner
    }
    myStory {
      ...StoryWithOwner
      # ...StoryNoOwner
    }
    # latestProject {
    #   ...StoryNoOwner
    # }
    # followingCount
    # followersCount
  }
  ${StoryWithOwner}
`;

export const MessageFragment = gql`
  fragment MessageFragment on Message {
    id
    createdAt
    to {
      id
    }
    from {
      id
      username
      name
      profilePic
    }
    content
    hidden {
      id
    }
  }
`;

export const ConvoFragment = gql`
  fragment ConvoFragment on Convo {
    id
    users {
      ...MinimalUser
    }
    messages(first: 5, orderBy: [{ createdAt: desc }]) {
      ...MessageFragment
    }
    hidden {
      id
    }
  }
  ${MinimalUser}
  ${MessageFragment}
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
    subField
    topic
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

export const UserProfileFragment = gql`
  fragment UserProfileFragment on User {
    ...MinimalUser
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

export const UserFollowing = gql`
  fragment UserFollowing on User {
    id
    username
    following {
      ...MinimalUser
    }
    followers {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;

export const UserWithMessages = gql`
  fragment UserWithMessages on User {
    ...MinimalUser
    convos {
      ...ConvoFragment
    }
    unReadMessagesCount
  }
  ${MinimalUser}
  ${ConvoFragment}
  ${MessageFragment}
`;

export const NotificationFragment = gql`
  fragment NotificationFragment on Notification {
    id
    createdAt
    style
    target {
      ...MinimalUser
    }
    from {
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
