import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';

const SeeMoreButton = ({ onPress, loading = false }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={{ ...defaultStyles.defaultText, color: colors.purp }}>{loading ? 'Loading' : 'Show'} more</Text>
        {loading ? (
          <View style={{ paddingHorizontal: 25 }}>
            <Loader size="small" loading={loading} full backgroundColor={colors.white} />
          </View>
        ) : (
          <Ionicons name="ios-arrow-forward" size={18} color={colors.iconGray} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
    paddingHorizontal: 15,
  },
});

export default SeeMoreButton;
