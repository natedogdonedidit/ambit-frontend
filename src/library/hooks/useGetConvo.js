import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import CURRENT_USER_MESSAGES from 'library/queries/CURRENT_USER_MESSAGES';
import { UserContext } from 'library/utils/UserContext';

// pass in a userID and this well return the convo w/ that user, or null if no such convo exists
function useGetConvo(userID) {
  const { currentUserId } = useContext(UserContext);

  const [convo, setConvo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getConvos() {
      const { loading, error, data } = useQuery(CURRENT_USER_MESSAGES);

      if (loading) {
        setIsLoading(true);
        setIsError(false);
        setConvo(null);
      } else if (error) {
        setIsLoading(false);
        setIsError(true);
        setConvo(null);
      } else if (data) {
        const { convos } = data.userLoggedIn;

        // get Convo based on otherUserPassedIn
        const convoo = convos.find((c) => {
          // get the other user in the chat
          const otherUser = c.users.find((user) => user.id !== currentUserId);

          // see if it equals the userPassedIn, if it does return the group
          return otherUser.id === userID;
        });

        // will be the convo w/ userID, or null if no such convo exists
        setConvo(convoo);
      }
    }

    getConvos();
  }, []);

  return { isLoading, isError, convo };
}

export default useGetConvo;
