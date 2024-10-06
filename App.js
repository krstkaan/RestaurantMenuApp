import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import SubCategoryPage from './screens/SubCategoryPage';
import ProductPage from './screens/ProductPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SubCategoryPage" component={SubCategoryPage} />
        <Stack.Screen name="ProductPage" component={ProductPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
