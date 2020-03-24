import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';

const Section = ({ children, text, loading = false }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={defaultStyles.headerSmall}>{text}</Text>
        {loading && (
          <View style={{ paddingRight: 15 }}>
            <Loader size="small" loading={loading} full backgroundColor={colors.white} />
          </View>
        )}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
});

export default Section;
