import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SubCategoriesPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { parentId } = route.params;
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;  // Ekran genişliği alınır

  useEffect(() => {
    fetch(`http://192.168.1.101:8000/get_subcategories.php?parentid=${parentId}`)
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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('ProductPage', { categoryId: item.id })}
          >
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
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
  categoryCard: {
    width: Dimensions.get('window').width / 2.2,  // Kart genişliği ekranın yarısına göre ayarlanır
    padding: 10,
    margin: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: Dimensions.get('window').width / 2.5,  // Görselin genişliği sabit
    height: Dimensions.get('window').width / 3,   // Görselin yüksekliği sabit
    marginBottom: 10,
    borderRadius: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SubCategoriesPage;
