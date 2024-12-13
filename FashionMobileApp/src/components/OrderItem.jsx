import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function OrderItem({orderDetail, onPress, buttonTitle}) {
  return (
    <View style={styles.itemContainer}>
      <Image source={{uri: orderDetail.imageUrl}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{orderDetail.name}</Text>
        <Text style={styles.itemSize}>Quantity: {orderDetail.quantity}</Text>
        <Text style={styles.itemPrice}>${orderDetail.price.toFixed(2)}</Text>
      </View>
      <Button mode='contained' onPress={onPress} style={styles.buttonContainer}>
        {buttonTitle}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
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
