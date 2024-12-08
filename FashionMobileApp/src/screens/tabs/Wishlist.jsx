import ProductCard from '@components/ProductCard';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';

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
  {
    title: 'Brown Jacket',
    price: '83.97',
    rating: '4.9',
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_ECC_Tapped_Fit.10.jpg',
  },
];
export default function Wishlist() {
  const theme = useTheme();

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="My Wishlist" titleStyle={styles.title} />
      </Appbar.Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={{marginVertical: 50}}>
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({item}) => (
              <ProductCard
                title={item.title}
                price={item.price}
                rating={item.rating}
                imageUrl={item.imageUrl}
              />
            )}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    elevation: 4,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
