import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SubCategoriesPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { parentId } = route.params;
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;  // Ekran genişliği alınır

  useEffect(() => {
    fetch(`http://192.168.1.105:8000/get_subcategories.php?parentid=${parentId}`)
      .then((response) => response.json())
      .then((data) => {
        setSubCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error);
        setLoading(false);
      });
  }, [parentId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={subCategories}
        numColumns={2}  // İki kolonlu bir grid yapısı
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.wrapper, index % 2 === 0 ? styles.leftColumnCard : styles.rightColumnCard]}
            onPress={() => navigation.navigate('ProductPage', { categoryId: item.id })}
          >
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
          </TouchableOpacity>
        )}
      />
    </View>
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


export default SubCategoriesPage;
