import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { HEADER_HEIGHT } from 'styles/constants';
import { useNavigation } from '@react-navigation/native';
import ProfilePic from 'library/components/UI/ProfilePic';
import { useQuery } from '@apollo/client';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

// Header Height is 44 !!!
// insets.top is used as padding under the StatusBar

const HeaderSearch = ({ searchText, setSearchText, handleRight, setKeyboardShowing, searchInputRef }) => {
  const navigation = useNavigation();

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = data;

  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity style={styles.leftSide} onPress={() => navigation.openDrawer()}>
        <ProfilePic user={userLoggedIn} size="small" enableIntro={false} enableStory={false} enableClick={false} />
      </TouchableOpacity>
      <View style={styles.middleSection}>
        <View style={styles.searchBarView}>
          <Icon name="search" size={18} color={colors.black} />
          <TextInput
            ref={searchInputRef}
            style={{
              ...styles.searchBarInput,
              ...defaultStyles.defaultText,
              color: colors.darkGray,
              paddingRight: 10,
              // backgroundColor: 'pink',
            }}
            onChangeText={(val) => setSearchText(val)}
            value={searchText}
            placeholder="Search Ambit"
            maxLength={50}
            returnKeyType="search"
            onFocus={() => {
              // console.log('keyboard show TRUE');
              setKeyboardShowing(true);
            }}
            onBlur={() => {
              // console.log('keyboard show FALSE');
              setKeyboardShowing(false);
            }}
          />
          {!!searchText && (
            <TouchableOpacity
              onPress={() => setSearchText('')}
              hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={20} color={colors.darkGray} style={{ paddingTop: 2, paddingRight: 10 }} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* <View style={styles.rightSide} /> */}
      <TouchableOpacity
        style={styles.rightSide}
        onPress={handleRight}
        hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
        activeOpacity={0.7}
      >
        {/* <View style={styles.iconCircle}> */}
        <Ionicons name="filter" size={22} color={colors.black} style={{ paddingRight: 2 }} />
        {/* </View> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEADER_HEIGHT + 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 10,
    paddingBottom: 4,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    zIndex: 100,
  },
  leftSide: {
    width: 50,
    alignItems: 'flex-start',
  },
  rightSide: {
    width: 40,
    alignItems: 'flex-end',
  },
  middleSection: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  searchBarView: {
    height: 36,
    width: '100%',
    borderRadius: 20,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.searchGray,
  },
  iconCircle: {
    height: 34,
    width: 34,
    marginLeft: 5,
    borderRadius: 17,
    backgroundColor: colors.systemGray5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBarInput: {
    flex: 1,
    // backgroundColor: colors.searchGray,
    paddingLeft: 10,
  },
});

export default HeaderSearch;

//   return (
//     <View style={{ ...styles.container, paddingTop: insets.top }}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.leftSide} onPress={() => navigation.openDrawer()}>
//           <ProfilePic user={userLoggedIn} size="small" enableIntro={false} enableStory={false} enableClick={false} />
//         </TouchableOpacity>

//         <View style={styles.middle}>
//           <Icon name="search" size={18} color={colors.black} />
//           <TextInput
//             style={{ ...styles.searchBarView, ...defaultStyles.defaultText, color: colors.darkGray }}
//             onChangeText={(val) => setSearchText(val)}
//             value={searchText}
//             placeholder="Search Ambit"
//             maxLength={50}
//           />
//         </View>

//         {/* <TouchableOpacity style={styles.rightSide} onPress={handleRight}>
//           <Ionicons name="ios-rocket" size={24} color={colors.iconGray} />
//         </TouchableOpacity> */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 6,
//     // borderBottomWidth: StyleSheet.hairlineWidth,
//     // borderBottomColor: colors.borderBlack,
//     backgroundColor: colors.white,
//   },
//   // top portion
//   header: {
//     height: HEADER_HEIGHT,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   leftSide: {
//     width: 30,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   searchBarView: {
//     flexDirection: 'row',
//     flex: 1,
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.searchGray,
//     height: 36,
//     borderRadius: 20,
//     paddingHorizontal: 15,
//   },
//   rightSide: {
//     width: 35,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   searchBarInput: {
//     flex: 1,
//     // backgroundColor: colors.searchGray,
//     paddingLeft: 10,
//   },
// });
