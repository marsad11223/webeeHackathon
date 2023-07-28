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
        {categories.map((Catageory, index) => {
          return (
            <Drawer.Screen
              name={`${index + 1}. ${Catageory.name}` || 'UNNAME CATEGEORY'}
              component={Items}
              initialParams={{ categoryId: Catageory.id }}
              key={index}
            />
          )
        })}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;