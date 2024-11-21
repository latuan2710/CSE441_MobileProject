import {StyleSheet, View} from 'react-native';
import {IconButton, Text, useTheme} from 'react-native-paper';

export default function QuantityField({quantity, setQuantity, max}) {
  const theme = useTheme();

  const handleMinus = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(pre => pre - 1);
  };

  const handlePlus = () => {
    if (!max) {
      setQuantity(pre => pre + 1);
    }

    if (quantity === max) {
      return;
    }
    setQuantity(pre => pre + 1);
  };

  return (
    <View style={styles.quantityContainer}>
      <IconButton
        icon={'minus'}
        size={16}
        iconColor="#fff"
        style={{backgroundColor: 'gray', borderRadius: 5}}
        onPress={handleMinus}
      />
      <Text style={styles.quantityText}>{quantity}</Text>
      <IconButton
        icon={'plus'}
        size={16}
        iconColor="#fff"
        style={{backgroundColor: theme.colors.primary, borderRadius: 5}}
        onPress={handlePlus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
