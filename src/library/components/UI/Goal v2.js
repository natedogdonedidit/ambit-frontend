// import React from 'react';
// import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// import colors from 'styles/colors';
// import defaultStyles from 'styles/defaultStyles';

// import { peopleGoals, answersGoals, hireGoals } from 'library/utils/lists';

// const Goal = ({ goal, onPress }) => {
//   const selectBorder = () => {
//     if (goal === 'Find investors') return { borderColor: colors.green };
//     if (peopleGoals.includes(goal)) return { borderColor: colors.blue };
//     if (answersGoals.includes(goal)) return { borderColor: colors.darkPurp };
//     if (hireGoals.includes(goal)) return { borderColor: colors.darkPurp };
//     return colors.lightGray;
//   };

//   const selectText = () => {
//     if (goal === 'Find investors') return { color: colors.green };
//     if (peopleGoals.includes(goal)) return { color: colors.blue };
//     if (answersGoals.includes(goal)) return { color: colors.darkPurp };
//     if (hireGoals.includes(goal)) return { color: colors.darkPurp };

//     return null;
//   };

//   const selectIcon = () => {
//     if (goal === 'Find investors') return <Image style={styles.imageIcon} source={require('library/assets/images/invest.png')} />;
//     if (answersGoals.includes(goal))
//       return <Icon name="lightbulb" solid size={15} color={colors.darkPurp} style={{ paddingRight: 8 }} />;
//     if (peopleGoals.includes(goal))
//       // return <Image style={styles.imageIcon} source={require('library/assets/images/connect.png')} />;
//       return <Icon name="user-friends" solid size={15} color={colors.blue} style={{ paddingRight: 8 }} />;
//     if (hireGoals.includes(goal))
//       return <Icon name="briefcase" solid size={15} color={colors.darkPurp} style={{ paddingRight: 8 }} />;
//   };

//   return (
//     <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
//       <View style={{ ...styles.goalView, ...selectBorder() }}>
//         {selectIcon()}
//         <Text style={{ ...defaultStyles.defaultMedium, ...selectText() }}>{goal}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default Goal;

// const styles = StyleSheet.create({
//   goalView: {
//     height: 32,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     borderWidth: 0.4,
//     borderColor: colors.darkGray,
//     paddingHorizontal: 15,
//   },
//   goalText: {},
//   imageIcon: {
//     width: 15,
//     height: 15,
//     marginRight: 10,
//   },
// });
