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
    investDesc
    freelanceDesc
    mentorDesc
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

// used for queries that only grab stories...StoriesHome / StoriesTopic
export const StoryFragment = gql`
  fragment StoryFragment on Story {
    id
    title
    owner {
      id
      username
      name
      location
      profilePic
    }
    type
    showcase
    topic
    items(orderBy: [{ createdAt: asc }]) {
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
      ...StoryFragment
    }
  }
  ${StoryFragment}
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
    image
    video
    isShare
    hidden {
      id
    }
    unread
  }
`;

export const ConvoFragment = gql`
  fragment ConvoFragment on Convo {
    id
    users {
      ...MinimalUser
    }
    messages(first: 5, orderBy: [{ createdAt: asc }]) {
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
    goalColor
    goalIcon
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
    repostedByMe
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
  ${StoryFragment}
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
    convos(orderBy: [{ lastUpdated: desc }]) {
      id
      lastUpdated
      users {
        ...MinimalUser
      }
    }
  }
  ${MinimalUser}
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
    # story {
    #   ...StoryFragment
    # }
    # storyItem {
    #   ...StoryItemFragment
    # }
    seen
  }
  ${MinimalUser}
  ${BasicPost}
  ${UpdateFragment}
  ${CommentFragment}
`;
