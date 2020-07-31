import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';

import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import Loader from 'library/components/UI/Loader';
import { UserContext } from 'library/utils/UserContext';
import EditProfileModalComponent from './EditProfileModalComponent';

const EditProfileModal = ({ navigation }) => {
  const { currentUserId } = useContext(UserContext);

  const { loading, data } = useQuery(SINGLE_USER_BIO, { variables: { id: currentUserId } });

  if (loading) {
    return <Loader active={loading} />;
  }

  const { user } = data;

  return <EditProfileModalComponent navigation={navigation} user={user} />;
};

export default EditProfileModal;
