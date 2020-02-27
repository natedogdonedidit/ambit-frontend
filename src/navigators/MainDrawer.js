import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabsNavigator from 'navigators/TabsNavigator';
import CustomDrawer from 'library/components/CustomDrawer';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      headerMode="none"
      drawerType="slide"
      drawerContent={({ navigation }) => <CustomDrawer navigation={navigation} />}
    >
      <Drawer.Screen name="Tabs" component={TabsNavigator} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;

// {
//   initialRouteName: 'Tabs',
//   drawerPosition: 'left',
//   drawerType: 'slide',
//   contentComponent: CustomDrawer,
//   drawerWidth: 300,
// }
