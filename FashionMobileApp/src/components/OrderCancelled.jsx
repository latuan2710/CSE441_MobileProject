import OrderItem from './OrderItem';

export default function OrderCancelled({orders}) {
  return (
    <>
      {orders.map(item => (
        <OrderItem
          key={item.id}
          orderDetail={item}
          buttonTitle={'Re-Order'}
          onPress={() => console.log('Re-Order')}
        />
      ))}
    </>
  );
}
