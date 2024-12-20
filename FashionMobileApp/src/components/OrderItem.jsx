import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function OrderItem({orderDetail}) {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{uri: orderDetail.product.image}}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text numberOfLines={2} style={styles.itemTitle}>
          {orderDetail.product.name}
        </Text>
        <Text style={styles.itemSize}>Quantity: {orderDetail.quantity}</Text>
        <Text style={styles.itemPrice}>
          ${orderDetail.product.price.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSize: {
    fontSize: 14,
    color: '#888',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});
