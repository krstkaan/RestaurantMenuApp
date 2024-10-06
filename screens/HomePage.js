import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title } from 'react-native-paper';  // Material Design bileşenleri

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;  // Ekran genişliği
  const screenHeight = Dimensions.get('window').height;  // Ekran yüksekliği

  useEffect(() => {
    fetch('http://192.168.1.101:8000/get_categories.php')
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
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('SubCategoryPage', { parentId: item.id })}>
              <Card style={styles.cardContainer}>
                <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
                <Card.Content>
                  <Title style={styles.title}>{item.name}</Title>
                </Card.Content>
              </Card>
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
    color: '#fff', // Yazı rengi beyaz olarak değiştirildi
    textAlign: 'center',
  },
  welcomeSubText: {
    fontSize: 16,
    color: '#ddd', // Yazı rengi gri tonlarına değiştirildi
    textAlign: 'center',
    marginTop: 10,
  },
  cardContainer: {
    width: Dimensions.get('window').width / 2.3,
    margin: 8,
    borderRadius: 15,
    elevation: 4,
    backgroundColor: '#fff',
  },
  cardImage: {
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Arka plan resminin tamamını kapla
  },
});

export default HomePage;
