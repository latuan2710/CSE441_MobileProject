import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Card, IconButton, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProductCard({title, price, rating, imageUrl}) {
  const theme = useTheme();

  return (
    <Card style={[styles.card, {backgroundColor: theme.colors.background}]}>
      <Card.Cover
        source={{uri: imageUrl}}
        resizeMode="cover"
        style={styles.image}
      />
      <Card.Content>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFC107" />
          <Text style={styles.rating}>{rating}</Text>
        </View>
        <Text style={styles.price}>${price}</Text>
      </Card.Content>
      <IconButton
        icon="heart-outline"
        size={20}
        onPress={() => console.log('Favorite')}
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
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
