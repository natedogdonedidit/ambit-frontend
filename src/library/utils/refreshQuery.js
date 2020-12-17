// import React from 'react';
// import { useApolloClient } from '@apollo/client';
import { viewedStories, viewedStoryItems } from 'library/utils/cache';

import POSTS_FORYOU_QUERY from 'library/queries/POSTS_FORYOU_QUERY';
import POSTS_FOLLOWING_QUERY from 'library/queries/POSTS_FOLLOWING_QUERY';
import POSTS_MYGOALS_QUERY from 'library/queries/POSTS_MYGOALS_QUERY';
import STORIES_FORYOU_QUERY from 'library/queries/STORIES_FORYOU_QUERY';

// const client = useApolloClient();

export async function refreshPostsForYou(client) {
  await client.query({
    query: POSTS_FORYOU_QUERY,
    variables: {
      feed: 'foryou',
      take: 10,
    },
    fetchPolicy: 'network-only',
  });
}

export async function refreshPostsFollowing(client) {
  await client.query({
    query: POSTS_FOLLOWING_QUERY,
    variables: {
      feed: 'following',
      take: 10,
    },
    fetchPolicy: 'network-only',
  });
}

export async function refreshPostsMyGoals(client) {
  await client.query({
    query: POSTS_MYGOALS_QUERY,
    variables: {
      feed: 'mygoals',
      take: 10,
    },
    fetchPolicy: 'network-only',
  });
}

export async function refreshStoriesForYou(client) {
  await client.query({
    query: STORIES_FORYOU_QUERY,
    variables: {
      feed: 'foryou',
      viewedStories: [...viewedStories()],
      viewedStoryItems: viewedStoryItems(),
    },
    fetchPolicy: 'network-only',
  });
}
