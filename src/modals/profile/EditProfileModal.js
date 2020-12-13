import React from 'react';
import { useQuery } from '@apollo/client';

import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import Loader from 'library/components/UI/Loader';
import EditProfileModalComponent from 'library/components/profile/EditProfileModalComponent';

const EditProfileModal = ({ navigation, route }) => {
  const { username } = route.params; // all the data from parent post down to updates

  const { loading, data } = useQuery(SINGLE_USER_BIO, { variables: { where: { username } } });

  if (loading) {
    return <Loader active={loading} />;
  }

  const { user } = data;

  return <EditProfileModalComponent navigation={navigation} user={user} />;
};

export default EditProfileModal;
