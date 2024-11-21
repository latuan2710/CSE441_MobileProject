import MyView from '@components/MyView';
import ProductCard from '@components/ProductCard';
import { WishlistContext } from '@context/WishlistContext';
import { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function Wishlist() {
  const {wishlist} = useContext(WishlistContext);

  return (
    <MyView>
      <FlatList
        scrollEnabled={false}
        numColumns={2}
        style={{marginVertical: 20}}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        showsVerticalScrollIndicator={false}
        data={wishlist}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ProductCard data={item} />}
      />
    </MyView>
  );
}
const styles = StyleSheet.create({});
