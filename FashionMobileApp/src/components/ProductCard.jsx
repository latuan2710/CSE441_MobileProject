import { WishlistContext } from '@context/WishlistContext';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { Card, IconButton, useTheme } from 'react-native-paper';

export default function ProductCard({id, title, price, imageUrl}) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [isFavor, setIsFavor] = useState(false);
  const {isContain, addWishlist, wishlist} = useContext(WishlistContext);

  useEffect(() => {
    setIsFavor(isContain(id));
  }, [wishlist, id]);

  return (
    <Card
      style={[styles.card, {backgroundColor: theme.colors.background}]}
      onPress={() => navigation.navigate('ProductDetail', {id})}>
      <Card.Cover
        source={{uri: imageUrl}}
        resizeMode="cover"
        style={styles.image}
      />
      <Card.Content>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.price}>${price}</Text>
      </Card.Content>
      <IconButton
        icon={isFavor ? 'heart' : 'heart-outline'}
        size={20}
        onPress={() => addWishlist(id)}
        style={styles.favoriteIcon}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('screen').width * 0.48,
    position: 'relative',
    margin: 10,
    flex: 1,
  },
  image: {
    height: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#d3d3d3',
  },
});
