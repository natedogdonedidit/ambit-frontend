import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';

const Section = ({ children, text, loading = false, marginTop = true, borderBottom = true, rightComponent, subText }) => {
  return (
    <View
      style={[
        styles.section,
        marginTop && { marginTop: 10 },
        borderBottom && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack },
      ]}
    >
      <View style={styles.sectionHeader}>
        <View style={{ flex: 1 }}>
          <Text style={defaultStyles.hugeHeavy}>{text}</Text>
          {subText}
        </View>
        {loading && (
          <View style={{ paddingRight: 15 }}>
            <Loader size="small" loading={loading} full backgroundColor={colors.white} />
          </View>
        )}
        {!!rightComponent && rightComponent}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
  },
  sectionHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});

export default Section;
