import ProductCard from '@components/ProductCard';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';

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

export default function Home() {
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={{marginVertical:50}}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
