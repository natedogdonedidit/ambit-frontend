import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

// import { moneyGoals, helpGoals, networkGoals, answersGoals, hireGoals } from 'library/utils/lists';
import { getGoalInfo, getTopicFromID } from 'library/utils';

const Goal = ({ goal, subField, onPress }) => {
  // const parentDiv = useRef(null);

  const { name } = useMemo(() => getTopicFromID(subField), [subField]);

  // const [parentWidth, setParentWidth] = useState(undefined);

  // const onParentLayout = (e) => {
  //   if (e.nativeEvent && e.nativeEvent.layout && e.nativeEvent.layout.width && e.nativeEvent.layout.width > 0) {
  //     console.log('setting goal width to:', e.nativeEvent.layout.width);
  //     setParentWidth(e.nativeEvent.layout.width);
  //   }
  // };

  return (
    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <View style={styles.whiteBack}>
        <View style={{ ...styles.goalView, backgroundColor: getGoalInfo(goal, 'secondaryColor') }}>
          <View style={styles.iconView}>
            {getGoalInfo(goal, 'emoji') ? (
              <Text style={{ ...defaultStyles.defaultMedium }}>{getGoalInfo(goal, 'emoji')}</Text>
            ) : (
              <Icon name={getGoalInfo(goal, 'icon')} size={16} color={getGoalInfo(goal, 'iconColor')} solid />
            )}
          </View>

          <View style={{ flexShrink: 10 }}>
            <Text style={{ backgroundColor: 'white' }}>
              <Text style={{ ...defaultStyles.defaultMedium }}>{`${goal}`}</Text>
              <Text style={{ ...defaultStyles.defaultLight }}>{` ${getGoalInfo(goal, 'adverb')} `}</Text>
              <Text style={{ ...defaultStyles.defaultMedium }}>{name}</Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, flexGrow: 10, backgroundColor: 'pink', opacity: 0.3 }} />
    </View>
  );
};

export default Goal;

const styles = StyleSheet.create({
  whiteBack: {
    backgroundColor: 'white',
    borderRadius: 15,
    ...defaultStyles.shadowGoal,
    flexShrink: 10,
    // marginTop: 5,
    // marginBottom: 10,
  },
  goalView: {
    // minWidth: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 10,
    backgroundColor: colors.grayButton,
    // marginRight: 4,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
    // flexShrink: 10,
  },
  iconView: {
    justifyContent: 'center',
    paddingRight: 10,
    width: 34,
    backgroundColor: 'black',
  },
});

// const Goal = ({ goal, subField, onPress }) => {
//   const parentDiv = useRef(null);

//   const { name } = useMemo(() => getTopicFromID(subField), [subField]);

//   const [parentWidth, setParentWidth] = useState(undefined);

//   const onParentLayout = (e) => {
//     if (e.nativeEvent && e.nativeEvent.layout && e.nativeEvent.layout.width && e.nativeEvent.layout.width > 0) {
//       console.log('setting goal width to:', e.nativeEvent.layout.width);
//       setParentWidth(e.nativeEvent.layout.width);
//     }
//   };

//   return (
//     // color background w/ black text
//     <View style={styles.whiteBack} ref={parentDiv} onLayout={onParentLayout}>
//       <View style={{ ...styles.goalView, backgroundColor: getGoalInfo(goal, 'secondaryColor'), width: parentWidth }}>
//         <View style={styles.iconView}>
//           {getGoalInfo(goal, 'emoji') ? (
//             <Text style={{ ...defaultStyles.defaultMedium }}>{getGoalInfo(goal, 'emoji')}</Text>
//           ) : (
//             <Icon name={getGoalInfo(goal, 'icon')} size={16} color={getGoalInfo(goal, 'iconColor')} solid />
//           )}
//         </View>
//         {/* <Text style={{ paddingRight: 16 }}> */}
//         {/* <View style={{ minWidth: 0, maxWidth: parentWidth ? parentWidth - 40 : undefined }}> */}
//         <Text>
//           <Text style={{ ...defaultStyles.defaultMedium }}>{`${goal}`}</Text>
//           <Text style={{ ...defaultStyles.defaultLight }}>{` ${getGoalInfo(goal, 'adverb')} `}</Text>
//           <Text style={{ ...defaultStyles.defaultMedium }}>{name}</Text>
//         </Text>
//         {/* </View> */}
//       </View>
//     </View>
//   );
// };
