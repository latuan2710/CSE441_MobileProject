import MyView from '@components/MyView';
import ProductCard from '@components/ProductCard';
import Waiting from '@components/Waiting';
import {WishlistContext} from '@context/WishlistContext';
import {getProductById} from '@services/productService';
import {useCallback, useContext, useEffect, useState} from 'react';
import {Alert, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const {wishlist} = useContext(WishlistContext);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await Promise.all(
        wishlist.map(async id => {
          try {
            return await getProductById(id);
          } catch (error) {
            Alert.alert('Error', `Fail to get product id: ${id}`);
            return null;
          }
        }),
      );

      setProducts(data.filter(product => product !== null));
      setLoading(false);
    };

    fetchWishlist();
  }, [refreshing, wishlist]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <MyView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="My Wishlist" titleStyle={styles.title} />
      </Appbar.Header>
      {loading ? (
        <Waiting />
      ) : (
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({item}) => (
            <ProductCard
              id={item.id}
              title={item.name}
              price={item.price}
              rating={item.rating}
              imageUrl={item.image}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </MyView>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
