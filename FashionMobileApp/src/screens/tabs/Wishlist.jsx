import MyView from '@components/MyView';
import ProductCard from '@components/ProductCard';
import {FlatList, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

const products = [
  {
    title: 'Brown Jacket',
    price: '83.97',
    rating: '4.9',
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_ECC_Tapped_Fit.10.jpg',
  },
  {
    title: 'Brown Jacket',
    price: '83.97',
    rating: '4.9',
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_ECC_Tapped_Fit.10.jpg',
  },
  {
    title: 'Brown Jacket',
    price: '83.97',
    rating: '4.9',
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_ECC_Tapped_Fit.10.jpg',
  },
  {
    title: 'Brown Jacket',
    price: '83.97',
    rating: '4.9',
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_ECC_Tapped_Fit.10.jpg',
  },
  {
    title: 'Brown Jacket',
    price: '83.97',
    rating: '4.9',
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_ECC_Tapped_Fit.10.jpg',
  },
  {
    title: 'Brown Jacket',
    price: '83.97',
    rating: '4.9',
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_ECC_Tapped_Fit.10.jpg',
  },
  {
    title: 'Brown Jacket',
    price: '83.97',
    rating: '4.9',
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_ECC_Tapped_Fit.10.jpg',
  },
  {
    title: 'Brown Jacket',
    price: '83.97',
    rating: '4.9',
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_ECC_Tapped_Fit.10.jpg',
  },
  {
    title: 'Brown Jacket',
    price: '83.97',
    rating: '4.9',
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_ECC_Tapped_Fit.10.jpg',
  },
];

export default function Wishlist() {
  return (
    <MyView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="My Wishlist" titleStyle={styles.title} />
      </Appbar.Header>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({item}) => (
          <ProductCard
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            imageUrl={item.imageUrl}
          />
        )}
      />
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
