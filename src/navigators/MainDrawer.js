import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabsNavigator from 'navigators/TabsNavigator';
import CustomDrawer from 'library/components/CustomDrawer';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Tabs" headerMode="none" drawerType="slide" drawerContent={() => <CustomDrawer />}>
      <Drawer.Screen name="Tabs" component={TabsNavigator} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
