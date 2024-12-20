import {cancelOrder, getOrderByStatus} from '@services/orderService';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, List, Text} from 'react-native-paper';
import OrderItem from './OrderItem';
import Waiting from './Waiting';

export default function OrderList({status}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const data = await getOrderByStatus(status);
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [status]);

  // Handle order cancellation
  const handleCancelOrder = orderId => {
    Alert.alert(
      'Cancel Order',
      `Are you sure you want to cancel order #${orderId}?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await cancelOrder(orderId);
              Alert.alert('Success', 'Cancel order successfully!');
            } catch (error) {
              Alert.alert('Error', error.response.data.message);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return <Waiting />;
  }

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Orders</Text>
      </View>
    );
  }

  return (
    <List.Section>
      {orders.map(order => (
        <List.Accordion
          key={order.id}
          title={`#${order.id} - $${order.totalPrice.toFixed(2)}`}
          titleStyle={styles.accordionTitle}>
          {order.orderDetails.map(od => (
            <List.Item
              key={od.id}
              title={() => (
                <OrderItem
                  orderDetail={od}
                  buttonTitle="Track Order"
                  onPress={() => console.log(`Track Order: ${order.id}`)}
                />
              )}
            />
          ))}
          {status !== 'CANCELLED' && status !== 'COMPLETED' && (
            <Button
              mode="contained"
              style={styles.cancelButton}
              onPress={() => handleCancelOrder(order.id)}>
              Cancel Order
            </Button>
          )}
        </List.Accordion>
      ))}
    </List.Section>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cancelButton: {
    margin: 10,
    backgroundColor: '#d32f2f', // Red color for cancel action
  },
});
