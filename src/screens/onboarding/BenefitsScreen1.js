import React, { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, FlatList, Dimensions } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/buttons/TextButton';

const BenefitsScreen1 = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const flatlistRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0)

  const data = [
    {
      key: "1",
      image: require('../../library/assets/images/BenefitsScreen1.png'),
      title: 'Hey there!',
      text: "You're about to go on an adventure. Before you leave, let's go over what you'll need, and what you can expect on your journey."
    },
    {
      key: "2",
      image: require('../../library/assets/images/BenefitsScreen2.png'),
      title: 'Make a map.',
      text: "Before you start your journey, you'll need to make a map that includes your destination, and a plan for how you'll get there. You'll do this on Ambit, but we call them goals and projects."
    },
    {
      key: "3",
      image: require('../../library/assets/images/BenefitsScreen3.png'),
      title: 'Lean on community.',
      text: "Even though you map out a plan, you'll still hit roadblocks along the way. That's okay, you'll have a community supporting you on your journey. On Ambit, our communities are called topics."
    },
    {
      key: "4",
      image: require('../../library/assets/images/BenefitsScreen4.png'),
      title: 'Build Relationships.',
      text: "You'll meet people along the way who will help you reach your destinatino quicker. On Ambit, you'll build these relationships by networking and connecting with informal mentors."
    },
    {
      key: "5",
      image: require('../../library/assets/images/BenefitsScreen5.png'),
      title: "You've arrived!",
      text: "Eventually, you'll arrive at your destination. Don't forget who helped you get there, and make sure you pay it forward."
    }
  ]

  const onViewableItemsChanged = ({
    viewableItems,
  }) => {
    // console.log(viewableItems)

    // Do stuff
    if (viewableItems && viewableItems.length > 0) {
      // always grab the later item
      const currentIndex = viewableItems[viewableItems.length - 1].index;
      setActiveIndex(currentIndex)
    }
  };
  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatlistRef}
            style={{ width: width }}
            horizontal
            snapToAlignment="start"
            snapToInterval={width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={100}
            bounces={false}
            disableIntervalMomentum
            // onViewableItemsChanged={({ viewableItems }) => {
            //   if (viewableItems && viewableItems.length > 0) {
            //     const currentIndex = viewableItems[0].index;
            //     setActiveIndex(currentIndex)
            //   }
            // }}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 100
            }}
            data={data}
            renderItem={({ item, index }) => {
              return (
                <View style={{ width: width, height: '100%' }}>
                  <View style={{ width: '100%', height: '60%', paddingHorizontal: 15, paddingTop: 10 }}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="contain"
                      source={item.image}
                    />
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40, paddingBottom: 60, display: 'flex', justifyContent: 'center' }}>
                    <Text style={{ ...defaultStyles.headerLarge, color: colors.purp, paddingBottom: 20 }}>{item.title}</Text>
                    <Text style={{ ...defaultStyles.hugeRegular }}>{item.text}</Text>
                  </View>
                </View>
              );
            }}
          />

        </View>

        <View style={styles.bottom}>
          <View style={{ width: 80, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TextButton onPress={() => navigation.navigate('Welcome')}>Skip</TextButton>
          </View>
          <View style={styles.circles}>
            {data.map((slide, i) => {
              if (i === activeIndex) {
                return <View key={i} style={styles.circleFilled} />
              }

              return <View key={i} style={styles.circle} />
            })}
          </View>
          <View style={{ width: 80, flexDirection: 'row', justifyContent: 'flex-end' }}>
            {activeIndex === data.length - 1 ? (
              <TextButton onPress={() => navigation.navigate('Welcome')}>Let's go!</TextButton>
            ) : (
              <TextButton
                onPress={() => {
                  if (activeIndex < data.length - 1) {
                    flatlistRef.current.scrollToIndex({ index: activeIndex + 1, viewPosition: 0.5 })
                  }
                }}
              >
                Next
              </TextButton>
            )}

          </View>
        </View>
      </SafeAreaView>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 42,
    width: '100%',
  },
  bottom: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
    width: '100%',
  },

  circles: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blueGray,
    margin: 5,
  },
  circleFilled: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blueGray,
    backgroundColor: colors.blueGray,
    margin: 5,
  },
});

export default BenefitsScreen1;
