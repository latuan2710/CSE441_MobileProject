import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import ProductCard from './ProductCard';
import {useEffect, useState} from 'react';
import {getProductByBrandId} from '@services/productService';

export default function HomeProductList({brandId, brandName, refresh}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductByBrandId(brandId).then(data => setProducts(data));
  }, [brandId, refresh]);

  return (
    <View style={{marginVertical: 10}}>
      <Text style={styles.title} variant="titleLarge">
        {brandName}
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={({item}) => (
          <ProductCard
            id={item.id}
            title={item.name}
            price={item.price}
            imageUrl={item.image}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 10,
    fontWeight: 900,
  },
});
