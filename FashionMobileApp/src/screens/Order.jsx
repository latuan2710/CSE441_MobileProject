import MyScrollView from '@components/MyScrollView';
import OrderActive from '@components/OrderActive';
import OrderCancelled from '@components/OrderCancelled';
import OrderCompleted from '@components/OrderCompleted';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Text, useTheme} from 'react-native-paper';

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

const tabs = ['active', 'completed', 'cancelled'];

export default function Order({navigation}) {
  const theme = useTheme();
  const [tab, setTab] = useState(tabs[0]);

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="My Orders" titleStyle={styles.title} />
      </Appbar.Header>
      <View
        style={[
          styles.tabContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setTab(item)}
            style={[styles.tabButton, tab === item && styles.activeTab]}>
            <Text
              variant="titleMedium"
              style={[styles.tabText, tab !== item && styles.inactiveTabText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <MyScrollView>
        {tab === 'active' && <OrderActive orders={orders} />}
        {tab === 'completed' && <OrderCompleted orders={orders} />}
        {tab === 'cancelled' && <OrderCancelled orders={orders} />}
      </MyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    padding: 5,
  },
  activeTab: {
    borderBottomWidth: 3,
  },
  tabText: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  inactiveTabText: {
    color: 'gray',
  },
});
