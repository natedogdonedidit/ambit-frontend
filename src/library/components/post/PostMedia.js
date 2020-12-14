import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import PostVideo from './PostVideo';

/// /////////////////////////////////////
// can be used for POST or UPDATE
/// /////////////////////////////////////

const PostMedia = ({ post }) => {
  const navigation = useNavigation();

  const containsMedia = post.video || post.images || post.image;

  if (!containsMedia) return null;

  // had to do this because post has field "images" and update has field "image" - FIX ON BACKEND LATER
  let images = [];
  if (post.images && post.images.length > 0) {
    images = [...post.images];
  } else if (post.image) {
    images = [post.image];
  }

  if (post.video) {
    return (
      <View style={styles.media}>
        <PostVideo url={post.video} />
      </View>
    );
  }
  if (images.length === 1) {
    return (
      <View style={styles.media}>
        <View style={{ width: '100%', height: 160 }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ImageViewerModal', { images, index: 0 })}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: images[0] }} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (images.length === 2) {
    return (
      <View style={styles.media}>
        <View style={{ width: '50%', height: 160, borderRightWidth: StyleSheet.hairlineWidth, borderColor: colors.lightGray }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ImageViewerModal', { images, index: 0 })}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: images[0] }} resizeMode="cover" />
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%', height: 160 }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ImageViewerModal', { images, index: 1 })}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: images[1] }} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (images.length === 3) {
    return (
      <View style={styles.media}>
        <View style={{ width: '100%', height: 120, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.lightGray }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ImageViewerModal', { images, index: 0 })}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: images[0] }} resizeMode="cover" />
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%', height: 120, borderRightWidth: StyleSheet.hairlineWidth, borderColor: colors.lightGray }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ImageViewerModal', { images, index: 1 })}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: images[1] }} resizeMode="cover" />
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%', height: 120 }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ImageViewerModal', { images, index: 2 })}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: images[2] }} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (images.length === 4) {
    return (
      <View style={styles.media}>
        <View
          style={{
            width: '50%',
            height: 120,
            borderRightWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: colors.lightGray,
          }}
        >
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ImageViewerModal', { images, index: 0 })}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: images[0] }} resizeMode="cover" />
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%', height: 120 }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ImageViewerModal', { images, index: 1 })}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: images[1] }} resizeMode="cover" />
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%', height: 120 }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ImageViewerModal', { images, index: 2 })}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: images[2] }} resizeMode="cover" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '50%',
            height: 120,
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderColor: colors.lightGray,
          }}
        >
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ImageViewerModal', { images, index: 3 })}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: images[3] }} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  media: {
    width: '100%',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginBottom: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default PostMedia;
