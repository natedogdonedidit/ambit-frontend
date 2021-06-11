import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const GenericPopupMenu = ({ navigation, route }) => {
  // array: [{ text: '', color: '', onPress: function }]
  const options = route.params.options || [];
  const onCancel = route.params.onCancel || navigation.goBack;

  const renderButtons = () => {
    if (options.length < 1) return null;

    return options.map(({ text, color, onPress = () => null, closeModal = true }, i) => {
      return (
        <TouchableOpacity
          key={i}
          activeOpacity={0.7}
          style={i === 0 ? styles.row : styles.rowLineTop}
          onPress={() => {
            if (closeModal) {
              navigation.goBack();
            }
            onPress();
          }}
        >
          <Text style={{ ...defaultStyles.hugeRegular, color: color || colors.black }}>{text}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          // navigation.goBack();
          onCancel();
        }}
      >
        <View style={styles.transparentSection} />
      </TouchableWithoutFeedback>
      <SafeAreaView>
        <View style={styles.modalContent}>{renderButtons()}</View>

        <View style={styles.closeButtonView}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => onCancel()} style={styles.closeButton}>
            <Text style={defaultStyles.hugeRegular}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default GenericPopupMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  transparentSection: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  modalContent: {
    width: '100%',
    flexDirection: 'column',
    borderRadius: 12,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  rowLineTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.4)',
  },
  closeButtonView: {
    paddingTop: 15,
  },
  closeButton: {
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
});
