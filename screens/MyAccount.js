import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { logout } from '../redux/UserSlice';
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const MyAccount =  ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('HomePage');
    dispatch(logout());
  };

  return (
    <View>
      <Text>MyAccount</Text>
      <Pressable style={styles.accountmenu} onPress={handleLogout} android_ripple={{ color: 'rgba(0,0,0,0.2)' }}>
        <Ionicons name="log-out" size={24} color="black" />
        <Text style={styles.accountmenutext}>Çıkış yap</Text>
        <Ionicons name="chevron-forward" size={24} color="black" style={{ marginLeft: 'auto' }} />
      </Pressable>
    </View>
  )
}

export default MyAccount

const styles = StyleSheet.create({})