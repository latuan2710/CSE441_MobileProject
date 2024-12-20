import CartItem from '@components/CartItem';
import Waiting from '@components/Waiting';
import {useIsFocused} from '@react-navigation/native';
import {deleteCartItem, getCart} from '@services/cartService';
import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Cart({navigation}) {
  const [cartItems, setCartItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(0);
  const isFocus = useIsFocused();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const loadCart = async () => {
    try {
      let data = await getCart();
      setCartItems(data.cartDetails);
    } catch (error) {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    loadCart();
  }, [refreshing]);

  useEffect(() => {
    setLoading(true);
    loadCart().then(() => setLoading(false));
  }, [isFocus]);

  const handleDelete = useCallback(async id => {
    try {
      await deleteCartItem(id);
      setLoading(true);
      await loadCart();
      setLoading(false);
    } catch (error) {}
  }, []);

  let total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
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
        {loading ? (
          <Waiting />
        ) : (
          <SwipeListView
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderHiddenItem={renderHiddenItem}
            data={cartItems}
            rightOpenValue={-75}
            keyExtractor={item => item.id}
            disableRightSwipe
            renderItem={({item}) => (
              <CartItem
                setRefreshing={setRefreshing}
                item={item}
                setCartItems={setCartItems}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
        <View style={styles.checkoutContainer}>
          <View style={styles.summary}>
            <Text style={styles.totalText}>Total Cost</Text>
            <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
          </View>
          <Button
            mode="contained"
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('Checkout')}>
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
  },
});
