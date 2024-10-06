import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { categoryId } = route.params;

  const screenWidth = Dimensions.get('window').width;  // Ekran genişliği alınır

  useEffect(() => {
    fetch(`http://192.168.1.101:8000/get_products.php?catid=${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [categoryId]);

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
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image
              source={{ uri: item.image }}
              style={[styles.productImage, { width: screenWidth * 0.9 }]}  // Görsel genişliği sayfa genişliğine ayarlanır
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>{item.price} TL</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
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
  productCard: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  productImage: {
    height: 200,  // Görsel yüksekliği sabitlenir
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default ProductsPage;
