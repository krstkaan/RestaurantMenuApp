import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../redux/UserSlice';
import { useSelector, useDispatch } from 'react-redux';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    const handleSignup = async () => {
        if (!email || !password || !username) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            let formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('username', username);
            
            const response = await axios.post('http://192.168.1.105:8000/signup.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Form-data gönderdiğimiz için doğru Content-Type ayarı
                },
            });
            console.log(response.data);
            if (response.data.sonuc === '0') {
                Alert.alert('Hata', response.data.mesaj, [{ text: 'Tamam' }]);
            } else {
                const token = response.data.token;

                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('username', response.data.username);

                setEmail('');
                setPassword('');
                setUsername('');
                dispatch(login(token));
            }

        } catch (error) {
            console.log(error);
            Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.', [{ text: 'Tamam' }]);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Kullanıcı Adı</Text>
            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Kullanıcı Adı"
                style={styles.input}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                style={styles.input}
            />
            <Text style={styles.label}>Şifre</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Şifre"
                secureTextEntry
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Kayıt Ol</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default Signup;
