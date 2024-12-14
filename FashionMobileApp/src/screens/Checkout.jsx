import MyView from '@components/MyView';
import OrderItem from '@components/OrderItem';
import {getProfile} from '@services/userService';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, Button, Divider, Text, TextInput} from 'react-native-paper';

const orders = [
  {
    id: 1,
    name: 'Brown Jacket',
    quantity: 10,
    price: 83.71,
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/pack3loUntitled-2_copy_86.jpg',
  },
  {
    id: 2,
    name: 'Brown Jacket',
    quantity: 10,
    price: 83.71,
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/pack3loUntitled-2_copy_86.jpg',
  },
  {
    id: 3,
    name: 'Brown Jacket',
    quantity: 10,
    price: 83.71,
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/pack3loUntitled-2_copy_86.jpg',
  },
  {
    id: 4,
    name: 'Brown Jacket',
    quantity: 10,
    price: 83.71,
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/pack3loUntitled-2_copy_86.jpg',
  },
  {
    id: 5,
    name: 'Brown Jacket',
    quantity: 10,
    price: 83.71,
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/pack3loUntitled-2_copy_86.jpg',
  },
];

export default function Checkout({navigation}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    getProfile().then(p => {
      setAddress(p.address);
      setName(p.username);
      setPhone(p.phone);
    });
  }, []);

  return (
    <MyView style={{flex: 1}}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Checkout" titleStyle={styles.title} />
      </Appbar.Header>
      <MyView style={styles.container}>
        <Text variant="titleMedium">Full Name</Text>
        <TextInput value={name} onChangeText={setName} />
        <Text variant="titleMedium">Phone</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
        />
        <Text variant="titleMedium">Address</Text>
        <TextInput value={address} onChangeText={setAddress} />
        <Divider style={styles.divider} />
        <Text variant="titleLarge">Order List</Text>
        <FlatList
          style={{flex: 1}}
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({item}) => <OrderItem orderDetail={item} />}
        />
      </MyView>
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={() => console.log('Continue to Payment')}>
          Continue to Payment
        </Button>
      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  header: {
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 16,
  },
  footer: {
    padding: 16,
    borderWidth: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
