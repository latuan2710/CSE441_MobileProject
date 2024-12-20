import MyScrollView from '@components/MyScrollView';
import Waiting from '@components/Waiting';
import {WishlistContext} from '@context/WishlistContext';
import {addToCart} from '@services/cartService';
import {getProductById} from '@services/productService';
import {useCallback, useContext, useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Appbar,
  Button,
  Chip,
  Divider,
  IconButton,
  Text,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ProductDetail({route, navigation}) {
  const {id} = route.params;
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('Brown');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavor, setIsFavor] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {isContain, addWishlist, wishlist} = useContext(WishlistContext);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const colors = [
    '#5C4033',
    '#C19A6B',
    '#D2B48C',
    '#CD853F',
    '#A52A2A',
    '#000000',
  ];

  useEffect(() => {
    setIsFavor(isContain(id));
  }, [wishlist, id]);

  useEffect(() => {
    getProductById(id).then(d => {
      setProduct(d);
      setLoading(false);
    });
  }, [refreshing]);

  if (loading) {
    return <Waiting />;
  }

  const handleAddToCart = async (prodcuctId, quantity) => {
    try {
      await addToCart(prodcuctId, quantity);
      Alert.alert('Success', 'Add to cart successfully!');
    } catch (error) {
      Alert.alert('Error', 'Add to cart failed!');
    }
  };

  return (
    <MyScrollView
      style={styles.container}
      refreshing={refreshing}
      setRefreshing={setRefreshing}>
      <Appbar.Header style={styles.appBar}>
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        />
        <Text variant="titleLarge" style={[styles.headerTitle]}>
          Product Details
        </Text>
        <IconButton
          icon={isFavor ? 'heart' : 'heart-outline'}
          onPress={async () => await addWishlist(product.id)}
          style={styles.iconButton}
        />
      </Appbar.Header>

      <Image
        source={{
          uri: product.image,
        }}
        style={styles.productImage}
      />

      <View style={styles.detailsContainer}>
        <Text variant="titleLarge" style={styles.productTitle}>
          {product.name}
        </Text>

        <Text variant="bodyMedium" style={styles.productDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
          <Text style={styles.readMore}>Read more</Text>
        </Text>

        <Divider style={styles.divider} />

        <Text variant="titleSmall" style={styles.sectionTitle}>
          Select Size: {selectedSize}
        </Text>
        <View style={styles.chipContainer}>
          {sizes.map(size => (
            <Chip
              key={size}
              mode="outlined"
              selectedColor={'#000'}
              selected={size === selectedSize}
              onPress={() => setSelectedSize(size)}>
              {size}
            </Chip>
          ))}
        </View>

        <Text variant="titleSmall" style={styles.sectionTitle}>
          Select Color: {selectedColor}
        </Text>
        <View style={styles.colorContainer}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedColor(color)}
              style={[
                styles.colorCircle,
                {backgroundColor: color},
                selectedColor === color && styles.colorSelected,
              ]}
            />
          ))}
        </View>

        <View style={styles.priceContainer}>
          <Text variant="titleMedium" style={styles.totalPrice}>
            Total Price: ${product.price}
          </Text>
          <Button
            mode="contained"
            icon="cart"
            buttonStyle={styles.addToCartButton}
            onPress={() => handleAddToCart(id, 1)}>
            <Text variant="titleMedium" style={{color: '#fff'}}>
              Add to Cart
            </Text>
          </Button>
        </View>
      </View>
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
  appBar: {elevation: 4},
  iconButton: {margin: 0},
  headerTitle: {flex: 1, textAlign: 'center'},
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailsContainer: {paddingHorizontal: 16, paddingVertical: 8},
  productTitle: {fontWeight: 'bold', marginBottom: 8},

  productDescription: {color: '#666', marginBottom: 8},
  readMore: {fontWeight: 'bold'},
  divider: {marginVertical: 16},
  sectionTitle: {marginBottom: 8, fontWeight: 'bold'},
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  colorContainer: {flexDirection: 'row', marginBottom: 16},
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#888',
  },
  colorSelected: {borderColor: '#5C4033', borderWidth: 5},
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalPrice: {fontWeight: 'bold'},
  addToCartButton: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
