import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const SharePopup = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  const { handleRepost, postId } = route.params;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onRepost = () => {
    handleRepost();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.transparentSection} />
      </TouchableWithoutFeedback>
      <View style={{ ...styles.modalContent, paddingBottom: insets.bottom }}>
        <Text style={styles.title}>Share post</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity activeOpacity={0.8} style={styles.buttonView} onPress={onShare}>
            <View style={{ ...styles.buttonCircle, backgroundColor: colors.purp, ...defaultStyles.shadowButton }}>
              <Feather name="external-link" size={24} color={colors.white} />
            </View>
            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>Share via..</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.buttonView} onPress={null}>
            <View style={{ ...styles.buttonCircle, backgroundColor: colors.white, ...defaultStyles.shadowButton }}>
              <View style={{ ...styles.buttonCircle, backgroundColor: colors.gray30 }}>
                <Feather name="link" size={24} color={colors.white} />
              </View>
            </View>

            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>Copy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonView}
            onPress={() => {
              navigation.goBack();
              navigation.navigate('DMPostPopup', { postId });
            }}
          >
            <View
              style={{ ...styles.buttonCircle, backgroundColor: colors.orange, ...defaultStyles.shadowButton, paddingTop: 3 }}
            >
              <Feather name="send" size={24} color={colors.white} />
            </View>
            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>DM</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.buttonView} onPress={onRepost}>
            <View style={{ ...styles.buttonCircle, backgroundColor: colors.green, ...defaultStyles.shadowButton }}>
              <Feather name="repeat" size={24} color={colors.white} />
            </View>
            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>Re-post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SharePopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // paddingHorizontal: 12,
    // paddingBottom: 12,
  },
  transparentSection: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  modalContent: {
    width: '100%',
    // height: 120,
    flexDirection: 'column',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    paddingTop: 15,
    ...defaultStyles.hugeSemibold,
    // color: colors.blueGray,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
    paddingHorizontal: 6,
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
