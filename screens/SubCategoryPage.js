import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
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
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={subCategories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryCard, { width: screenWidth * 0.9 }]}  // Kart genişliği ekranın %90'ı
            onPress={() => navigation.navigate('ProductPage', { categoryId: item.id })}
          >
            <Image source={{ uri: item.image }} style={[styles.categoryImage, { width: screenWidth * 0.8, height: screenWidth * 0.4 }]} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCard: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',  // Görseli ve metni ortalamak için
  },
  categoryImage: {
    marginBottom: 10,
    borderRadius: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SubCategoriesPage;
