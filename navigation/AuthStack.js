import { StyleSheet,Image } from 'react-native';
import React from 'react';
import HomePage from '../screens/HomePage';
import SubCategoryPage from '../screens/SubCategoryPage';
import ProductPage from '../screens/ProductPage';
import MyAccount from '../screens/MyAccount';
import MyCart from '../screens/MyCart';
import Signup from '../screens/Signup';
import LoginPage from '../screens/LoginPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Tab Navigator to be used within AuthStack

// AuthStack with Tab Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false,}}/>
    <Stack.Screen name="SubCategoryPage" component={SubCategoryPage} />
    <Stack.Screen name="ProductPage" component={ProductPage} />
    <Stack.Screen name='MyAccountPage' component={MyAccount}/>
    <Stack.Screen name='MyCartPage' component={MyCart}/>
    <Stack.Screen name='SignupPage' component={Signup}/>   
    <Stack.Screen name='LoginPage' component={LoginPage}/>
  </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  

});