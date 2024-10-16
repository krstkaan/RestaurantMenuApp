import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { logout } from '../redux/UserSlice';
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const MyAccount = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('HomePage');
    dispatch(logout());
  };

  return (
    <View>

      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Pressable style={styles.accountmenu} android_ripple={{ color: 'rgba(0,0,0,0.2)' }} onPress={() => navigation.navigate('Siparişlerim')}>
          <Ionicons name="cart-outline" size={24} color="#ca1c1c" />
          <Text style={styles.accountmenutext}>Siparişlerim</Text>
          <Ionicons name="chevron-forward" size={24} color="#ca1c1c" style={{ marginLeft: 'auto' }} />
        </Pressable>
        <Pressable style={styles.accountmenu} android_ripple={{ color: 'rgba(0,0,0,0.2)' }} onPress={() => navigation.navigate('Konumlarım')}>
          <Ionicons name="home-outline" size={24} color="#ca1c1c" />
          <Text style={styles.accountmenutext}>Konumlarım</Text>
          <Ionicons name="chevron-forward" size={24} color="#ca1c1c" style={{ marginLeft: 'auto' }} />
        </Pressable>
        <Pressable style={styles.accountmenu} onPress={handleLogout} android_ripple={{ color: 'rgba(0,0,0,0.2)' }}>
          <Ionicons name="log-out-outline" size={24} color="#ca1c1c" />
          <Text style={styles.accountmenutext}>Çıkış yap</Text>
          <Ionicons name="chevron-forward" size={24} color="#ca1c1c" style={{ marginLeft: 'auto' }} />
        </Pressable>
      </View>
    </View>
  )
}

export default MyAccount

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f9f9f9',
    top: 0,
    height: '100%',
  },
  accountmenu: {
    padding: 10,
    borderRadius: 0,
    marginTop: 10,
    width: '100%',
    alignItems: 'left',
    borderBottomWidth: 1,
    borderColor: 'rgba(169,169,169,0.3)',
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
  },
  accountmenutext: {
    fontSize: 16,
    paddingLeft: 10,
  },
});