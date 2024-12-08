import MyScrollView from '@components/MyScrollView';
import ProductCard from '@components/ProductCard';
import Waiting from '@components/Waiting';
import { getAllProducts } from '@services/productService';
import { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllProducts()
      .then(d => {
        setProducts(d);
        setLoading(false);
      })
      .catch(err =>
        Alert.alert("Error",err.message)
      );
  }, [refreshing]);

  if (loading) return <Waiting />;

  return (
    <MyScrollView refreshing={refreshing} setRefreshing={setRefreshing}>
      <View style={{marginVertical: 50}}>
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({item}) => (
            <ProductCard
              title={item.name}
              price={item.price}
              rating={item.rating}
              imageUrl={item.image}
            />
          )}
        />
      </View>
    </MyScrollView>
  );
}
