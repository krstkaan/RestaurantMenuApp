import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import SubCategoryPage from './screens/SubCategoryPage';
import ProductPage from './screens/ProductPage';
import CustomUserBottomBar from './component/CustomUserBottomBar';
import MyAccount from './screens/MyAccount';
import MyCart from './screens/MyCart';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false,}}/>
        <Stack.Screen name="SubCategoryPage" component={SubCategoryPage} />
        <Stack.Screen name="ProductPage" component={ProductPage} />
        <Stack.Screen name='MyAccountPage' component={MyAccount}/>
        <Stack.Screen name='MyCartPage' component={MyCart}/>
        
      </Stack.Navigator>
      <CustomUserBottomBar/>

    </NavigationContainer>
  );
};

export default App;
