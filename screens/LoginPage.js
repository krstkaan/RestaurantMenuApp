import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/UserSlice';



export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();


  
  const handleLogin = async () => {
    if (!email || !password) {
        Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
        return;
    }

    try {
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        
        const response = await axios.post('http://192.168.1.105:8000/login.php',formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Form-data gönderdiğimiz için doğru Content-Type ayarı
                },
            }
        );
        console.log(response.data);
        if (response.data.sonuc === '0') {
            Alert.alert('Hata', response.data.mesaj, [{ text: 'Tamam' }]);
        } else {
            
            // Başarılı ise token'ı al ve kaydet
            const token = response.data.token;

            // Token'ı AsyncStorage'a kaydet
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('email', email);

            // State sıfırlama
            setEmail('');
            setPassword('');
            //navigation.navigate('HomePage');
            dispatch(login(token));
        }

    } catch (error) {
        console.log(error);
        Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.', [{ text: 'Tamam' }]);
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
