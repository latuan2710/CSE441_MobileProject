import CartItem from '@components/CartItem';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      title: 'Brown Jacket',
      size: 'XL',
      price: 83.97,
      quantity: 1,
      imageUrl:
        'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/pack3loUntitled-2_copy_86.jpg',
    },
    {
      id: '2',
      title: 'Brown Suite',
      size: 'XL',
      price: 120.0,
      quantity: 1,
      imageUrl:
        'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/pack3loUntitled-2_copy_86.jpg',
    },
    {
      id: '3',
      title: 'Brown Jacket',
      size: 'L',
      price: 79.99,
      quantity: 1,
      imageUrl:
        'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/pack3loUntitled-2_copy_86.jpg',
    },
    {
      id: '4',
      title: 'Brown Suite',
      size: 'M',
      price: 110.5,
      quantity: 1,
      imageUrl:
        'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/pack3loUntitled-2_copy_86.jpg',
    },
  ]);

  const handleDelete = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  let total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const renderHiddenItem = ({item}) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}>
        <Icon name="trash" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="My Cart" titleStyle={styles.title} />
      </Appbar.Header>
      <View style={styles.container}>
        <SwipeListView
          showsVerticalScrollIndicator={false}
          data={cartItems}
          renderItem={({item}) => (
            <CartItem item={item} setCartItems={setCartItems} />
          )}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
          keyExtractor={item => item.id}
          disableRightSwipe
        />
        <View style={styles.checkoutContainer}>
          <View style={styles.summary}>
            <Text style={styles.totalText}>Total Cost</Text>
            <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
          </View>
          <Button mode="contained" style={styles.checkoutButton}>
            Proceed to Checkout
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    elevation: 4,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#ff3d00',
  },
  deleteButton: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#888',
  },
  summaryPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: '#5a3815',
  },
});
