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
        <Text style={{ ...defaultStyles.defaultText, color: colors.purp }}>Show more</Text>
        {loading ? (
          <View style={{ paddingRight: 15 }}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
});

export default SeeMoreButton;
