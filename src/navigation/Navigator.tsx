import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../screens/Dashboard';
import Categories from '../screens/Categories';
import Items from '../screens/Items';
import { useAppSelector } from '../store/hooks';

function Navigator() {
  const Drawer = createDrawerNavigator();
  const { categories } = useAppSelector(state => state.category)

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Categories" component={Categories} />
        {categories.map((Catageory) => {
          return (
            <Drawer.Screen name={Catageory.name || 'UNNAME CATEGEORY'} component={Items} initialParams={{ category: Catageory }} />
          )
        })}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;