import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title } from 'react-native-paper';  // Material Design bileşenleri
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { login } from '../redux/UserSlice';





const HomePage = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  const screenWidth = Dimensions.get('window').width;  // Ekran genişliği
  const screenHeight = Dimensions.get('window').height;  // Ekran yüksekliği

  const checkAutologin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        let formData = new FormData();
        formData.append('token', token);
        const response = await axios.post('http://192.168.1.105:8000/autologin.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('kaan');
        console.log(response.data);
        if (response.data.isAuth) {
          dispatch(login(token));
        } else if (response.data.isAuth === false) {
          // tüm tanımlı  AsyncStorage sil
          await AsyncStorage.clear();

          dispatch(logout());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      checkAutologin().catch((error) => console.error('Autologin process error:', error));
    }, [dispatch, navigation])
  );

  useEffect(() => {
    fetch('http://192.168.1.105:8000/get_categories.php')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  const renderHeader = () => (
    <View style={[styles.welcomeContainer, { height: screenHeight * 0.35 }]}>
      <ImageBackground 
        source={require('../assets/images/welcome-background.jpg')}  // welcomeBox için arka plan resmi
        style={[styles.welcomeBox, { width: screenWidth }]}  // Tam genişlik verildi
        imageStyle={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}  // Arka plan resminin köşe yuvarlamaları
      >
        <Text style={styles.welcomeText}>Lezzetli Seçenekler Sizi Bekliyor!</Text>
        <Text style={styles.welcomeSubText}>Kategorilerimize göz atın ve en güzel tarifleri keşfedin.</Text>
      </ImageBackground>
    </View>
  );

  return (
    <ImageBackground 
      source={require('../assets/images/background.jpg')}  // Arka plan resmi assets klasöründen çekiliyor
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        
        <FlatList
          data={categories}
          ListHeaderComponent={renderHeader} // Karşılama metnini liste başlığı olarak ekler
          numColumns={2} // İki kolonlu bir grid yapısı
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => navigation.navigate('SubCategoryPage', { parentId: item.id })}>
              <View style={[styles.wrapper, index % 2 === 0 ? styles.leftColumnCard : styles.rightColumnCard]}>
                <View style={styles.head}>
                  <ImageBackground source={{ uri: item.image }} style={styles.headImage} />
                </View>
                <View style={styles.blueOverlay} />
                <View style={styles.content}>
                  <Text style={styles.contentTitle}></Text>
                </View>
                <View style={styles.bottom}>
                  <Text style={styles.bottomText}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:75,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6200ea',
  },
  welcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    top: -20,
    width: '100%',
  },
  welcomeBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 50, // Alt köşeleri daha yuvarlak yapar
    borderBottomRightRadius: 50, // Alt köşeleri daha yuvarlak yapar
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  welcomeSubText: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginTop: 10,
  },
  wrapper: {
    width: Dimensions.get('window').width / 2.3,
    backgroundColor: '#fff',
    textAlign: 'left',
    position: 'relative',
    borderRadius: 30,
    overflow: 'hidden',
    boxShadow: '0px 1px 6px rgba(31, 31, 31, 0.12), 0px 1px 4px rgba(31, 31, 31, 0.12)',
    margin: 12,
  },
  head: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgb(130, 168, 225)',
  },
  headImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  blueOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 175,
    backgroundColor: 'rgba(4, 96, 130, 0.8)',
    transform: [{ skewY: '-10deg' }],
  },
  content: {
    position: 'absolute',
    top: 260,
    left: 25,
    color: '#fff',
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  contentSubtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 18,
  },
  bottom: {
    width: '100%',
    bottom: 4,
    padding: 10,
    backgroundColor: 'rgba(4, 96, 130, 0.8)',
  },
  bottomText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leftColumnCard: {
    marginTop: 0,
  },
  rightColumnCard: {
    marginTop: 30,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default HomePage;
