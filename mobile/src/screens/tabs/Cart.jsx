import CartItem from '@components/CartItem';
import MyView from '@components/MyView';
import React from 'react';
import {FlatList, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';

const data = [
  {
    id: '1',
    image: require('@assets/images/image.png'),
    name: 'Brown Jacket',
    size: 'XL',
    price: 83.97,
    
  },
  {
    id: '2',
    image: require('@assets/images/image.png'),
    name: 'Brown Suite',
    size: 'XL',
    price: 120,
    
  },
  {
    id: '3',
    image: require('@assets/images/image.png'),
    name: 'Brown Jacket',
    size: 'XL',
    price: 83.97,
    
  },
  {
    id: '4',
    image: require('@assets/images/image.png'),
    name: 'Brown Jacket',
    size: 'XL',
    price: 83.97,
    
  },
  {
    id: '5',
    image: require('@assets/images/image.png'),
    name: 'Brown Suite',
    size: 'XL',
    price: 120,
    
  },
  {
    id: '6',
    image: require('@assets/images/image.png'),
    name: 'Brown Jacket',
    size: 'XL',
    price: 83.97,
    
  },
  {
    id: '7',
    image: require('@assets/images/image.png'),
    name: 'Brown Jacket',
    size: 'XL',
    price: 83.97,
    
  },
  {
    id: '8',
    image: require('@assets/images/image.png'),
    name: 'Brown Suite',
    size: 'XL',
    price: 120,
    
  },
  {
    id: '9',
    image: require('@assets/images/image.png'),
    name: 'Brown Jacket',
    size: 'XL',
    price: 83.97,
    
  },
  {
    id: '10',
    image: require('@assets/images/image.png'),
    name: 'Brown Jacket',
    size: 'XL',
    price: 83.97,
    
  },
  {
    id: '11',
    image: require('@assets/images/image.png'),
    name: 'Brown Suite',
    size: 'XL',
    price: 120,
    
  },
  {
    id: '12',
    image: require('@assets/images/image.png'),
    name: 'Brown Jacket',
    size: 'XL',
    price: 83.97,
    
  },
];

export default function Cart() {
  const [cartData, setCartData] = React.useState(data);

  const handleDelete = id => {
    setCartData(cartData.filter(item => item.id !== id));
  };
  return (
    <MyView scrollable={false}>
      <FlatList
        data={cartData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CartItem item={item} onDelete={handleDelete} />
        )}
      />
      <View
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -40},
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}>
        <TextInput
          mode="outlined"
          label="Outlined input"
          placeholder="Type something"
          right={<Text>Apply</Text>}
        />
      </View>
    </MyView>
  );
}
