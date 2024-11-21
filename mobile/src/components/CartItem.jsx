import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { IconButton, Text } from 'react-native-paper';
import QuantityField from './QuantityField';

export default function CartItem({item, onDelete}) {
  const [quantity, setQuantity] = useState(1);

  const renderRightActions = () => (
    <IconButton
      icon={'trash-can'}
      size={24}
      iconColor="red"
      onPress={() => onDelete(item.id)}
      style={styles.deleteButton}
    />
  );

  return (
    <View style={{borderBottomWidth: 0.8}}>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.itemContainer}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>
              ${parseInt(item.price) * quantity}
            </Text>
          </View>
          <QuantityField
            max={10}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    gap: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    borderRadius: 4,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#fad7d9',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
    borderRadius: 0,
  },
});
