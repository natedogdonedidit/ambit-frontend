import gql from 'graphql-tag';
import { ListPosts } from 'library/queries/_fragments';

const TOPIC_POSTS_QUERY_TRENDING = gql`
  query TOPIC_POSTS_QUERY_TRENDING($cursor: String) {
    postsTopic(topic: "Trending", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPIC_POSTS_QUERY_TECHNOLOGY = gql`
  query TOPIC_POSTS_QUERY_TECHNOLOGY($cursor: String) {
    postsTopic(topic: "Technology", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPIC_POSTS_QUERY_SCIENCE = gql`
  query TOPIC_POSTS_QUERY_SCIENCE($cursor: String) {
    postsTopic(topic: "Science & Research", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPIC_POSTS_QUERY_AUTOMOTIVE = gql`
  query TOPIC_POSTS_QUERY_AUTOMOTIVE($cursor: String) {
    postsTopic(topic: "Automotive", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPIC_POSTS_QUERY_GAMING = gql`
  query TOPIC_POSTS_QUERY_GAMING($cursor: String) {
    postsTopic(topic: "Gaming", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPIC_POSTS_QUERY_SPORTS = gql`
  query TOPIC_POSTS_QUERY_SPORTS($cursor: String) {
    postsTopic(topic: "Sports", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPIC_POSTS_QUERY_REALESTATE = gql`
  query TOPIC_POSTS_QUERY_REALESTATE($cursor: String) {
    postsTopic(topic: "Real Estate", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPIC_POSTS_QUERY_PHOTOGRAPHY = gql`
  query TOPIC_POSTS_QUERY_PHOTOGRAPHY($cursor: String) {
    postsTopic(topic: "Photography", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPIC_POSTS_QUERY_VIDEOGRAPHY = gql`
  query TOPIC_POSTS_QUERY_VIDEOGRAPHY($cursor: String) {
    postsTopic(topic: "Videography", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPIC_POSTS_QUERY_MUSIC = gql`
  query TOPIC_POSTS_QUERY_MUSIC($cursor: String) {
    postsTopic(topic: "Music", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const topicToQuery = topic => {
  let query = TOPIC_POSTS_QUERY_TRENDING;

  switch (topic) {
    case 'Technology':
      query = TOPIC_POSTS_QUERY_TECHNOLOGY;
      break;
    case 'Science & Research':
      query = TOPIC_POSTS_QUERY_SCIENCE;
      break;
    case 'Automotive':
      query = TOPIC_POSTS_QUERY_AUTOMOTIVE;
      break;
    case 'Gaming':
      query = TOPIC_POSTS_QUERY_GAMING;
      break;
    case 'Sports':
      query = TOPIC_POSTS_QUERY_SPORTS;
      break;
    case 'Real Estate':
      query = TOPIC_POSTS_QUERY_REALESTATE;
      break;
    case 'Photography':
      query = TOPIC_POSTS_QUERY_PHOTOGRAPHY;
      break;
    case 'Videography':
      query = TOPIC_POSTS_QUERY_VIDEOGRAPHY;
      break;
    case 'Music':
      query = TOPIC_POSTS_QUERY_MUSIC;
      break;
    default:
      query = TOPIC_POSTS_QUERY_TRENDING;
      break;
  }

  return query;
};

export default {
  TOPIC_POSTS_QUERY_TRENDING,
  TOPIC_POSTS_QUERY_TECHNOLOGY,
  TOPIC_POSTS_QUERY_SCIENCE,
  TOPIC_POSTS_QUERY_AUTOMOTIVE,
  TOPIC_POSTS_QUERY_GAMING,
  TOPIC_POSTS_QUERY_SPORTS,
  TOPIC_POSTS_QUERY_REALESTATE,
  TOPIC_POSTS_QUERY_PHOTOGRAPHY,
  TOPIC_POSTS_QUERY_VIDEOGRAPHY,
  TOPIC_POSTS_QUERY_MUSIC,
  topicToQuery,
};
