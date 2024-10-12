import { StyleSheet, Image, Button } from 'react-native';
import React from 'react';
import HomePage from '../screens/HomePage';
import SubCategoryPage from '../screens/SubCategoryPage';
import ProductPage from '../screens/ProductPage';
import MyAccount from '../screens/MyAccount';
import MyCart from '../screens/MyCart';
import AdminAccount from '../screens/AdminAccount';

import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();


// UserStack with Tab Navigator 
const AdminStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false,}}/>
    <Stack.Screen name="SubCategoryPage" component={SubCategoryPage} />
    <Stack.Screen name="ProductPage" component={ProductPage} />
    <Stack.Screen name='MyAccountPage' component={MyAccount}/>
    <Stack.Screen name='MyCartPage' component={MyCart}/> 
    <Stack.Screen name='AdminAccountPage' component={AdminAccount}/>
  </Stack.Navigator>
  );
};

export default AdminStack;

const styles = StyleSheet.create({
  Baslik: {
    backgroundColor: '#FF7F00',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: '#FFFAF0'
  },
  BaslikTitle: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold'
  }
});